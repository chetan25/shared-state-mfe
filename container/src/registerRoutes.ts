import { setRoutes } from './global-state/store';

const registerRoutes = () => {
      // configure routes for remotes
    // @ts-ignore
    import(/* webpackIgnore: true */ "http://localhost:8081/marketingAppRoutes.js")
    .then(() => {
        // @ts-ignore
        setRoutes(window['marketingAppRoutes']);
    });
    // @ts-ignore
    import(/* webpackIgnore: true */ "http://localhost:8082/orderAppRoutes.js")
    .then(() => {
        // @ts-ignore
        setRoutes(window['orderAppRoutes']);
    });
}

export default registerRoutes;