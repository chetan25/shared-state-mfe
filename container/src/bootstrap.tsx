import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import registerRoutes from './registerRoutes';

registerRoutes();
ReactDOM.render(
    <App/>,
    document.querySelector('#root')
)