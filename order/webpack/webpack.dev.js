const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const devConfig = {
    entry: {
        main: './src/index.js',
        orderAppRoutes: './src/exposeRoutes.js'
    },
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8082/'
    },
    devServer: {
        port: 8082,
        contentBase: '../public',
        historyApiFallback: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
          }
        // historyApiFallback: {
        //     index: 'index.html'
        // }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ModuleFederationPlugin({
            name: 'order',
            filename: 'remoteOrderEntry.js',
            remotes: {
                'container': 'container@http://localhost:8080/remoteEntry.js',
            },
            exposes: {
                './OrderApp': './src/bootstrap'
            },
            // shared: ['react', 'react-dom']
            shared: packageJson.dependencies // optional way to list all dependencies as shared
        })
    ]
}

// devConfig overrides the baseConfig, if there is common attributes
module.exports = merge(baseConfig, devConfig);