import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import MarketingApp from './app';

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

// mounts the Marketing App
const mountMarketing = (element: HTMLElement, options?: MountOptions) => {
    console.log({options});
    const history = options?.defaultHistory ? options.defaultHistory : createMemoryHistory({
        //MemoryHistory Object we created would by default use '/' as initial route,
        // so when we navigate from a main route to '/mfe-marketing' the MemoryHistory of Marketing
        //  would not pick that route,
        // since for the first time it would get initialized with '/'.
        //  To fix this we need to set the initial route for this to be '/mfe-marketing'
        initialEntries: [options?.initialPath || '/mfe-marketing']
    });

    if (options) {
        history.listen(options.onNavigate);
    }
    /** Render to DOM **/
    ReactDOM.render(
        <MarketingApp history={history} />,
        element
    );

    // for container to update marketing app
    return {
        onContainerNavigate({pathname: newContainerPath}: LocationProp) {
            const { pathname } = history.location;
            if (pathname !== newContainerPath) {
                history.push(newContainerPath);
            }
        }
    }
}

// check for running in development mode, used for standalone
if (process.env.NODE_ENV === 'development') {
    const history = createBrowserHistory();
    const element = document.querySelector('#marketing-dev') as HTMLElement;
    if (element) {
        mountMarketing(element, {defaultHistory: history});
    }
}

// used by Container App to load the Micro FE
export { mountMarketing };