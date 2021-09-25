import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import OrderApp from './app';

interface LocationProp {
    hash: string;
    key: string;
    pathname: string;
    search:string; 
}

interface MountOptions {
    onNavigate?:  () => void;
    defaultHistory?: any;
    initialPath?: string;
    onAuthChange?: (user: {email: string} | null) => void;
}

// mounts the order App
const mountOrder = (element: HTMLElement, options?: MountOptions) => {
    const history = options?.defaultHistory ? options.defaultHistory : createMemoryHistory({
        //MemoryHistory Object we created would by default use '/' as initial route,
        // so when we navigate from a main route to '/mfe-order' the MemoryHistory of Order
        //  would not pick that route,
        // since for the first time it would get initialized with '/'.
        //  To fix this we need to set the initial route for this to be '/mfe-order'
        initialEntries: [options?.initialPath || '/mfe-order']
    });

    if (options) {
        history.listen(options.onNavigate);
    }
    /** Render to DOM **/
    ReactDOM.render(
        <OrderApp history={history} />,
        element
    );

    // for container to update order app
    return {
        onContainerNavigate({pathname: newContainerPath}: LocationProp) {
            console.log('order')
            const { pathname } = history.location;
            console.log(pathname, newContainerPath);
            if (pathname !== newContainerPath) {
                history.push(newContainerPath);
            }
        }
    }
}

// check for running in development mode, used for standalone
if (process.env.NODE_ENV === 'development') {
    const history = createBrowserHistory();
    const element = document.querySelector('#order-dev') as HTMLElement;
    if (element) {
        mountOrder(element, {defaultHistory: history});
    }
}

// used by Container App to load the Micro FE
export { mountOrder };