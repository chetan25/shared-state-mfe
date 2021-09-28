const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const devConfig = {
    entry: {
        main: './src/index.js',
        marketingAppRoutes: './src/exposeRoutes.js'
    },
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8081/'
    },
    devServer: {
        port: 8081,
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
            name: 'marketing',
            filename: 'remoteMarketingEntry.js',
            remotes: {
                'container': 'container@http://localhost:8080/remoteEntry.js',
            },
            exposes: {
                './MarketingApp': './src/bootstrap'
            },
            // shared: ['react', 'react-dom']
            shared: [
                {
                    ...packageJson.dependencies,
                    'global-state': {
                        import: "global-state",
                        singleton: true,
                    }
                },
                //    {
                //     './src/global-state/shared-context': {
                //         import: './src/global-state/shared-context',
                //         singleton: true,
                //     }
                // './src/global-state/shared-context-2'
            ],
        })
    ]
}

// devConfig overrides the baseConfig, if there is common attributes
module.exports = merge(baseConfig, devConfig);