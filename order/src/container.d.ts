declare module "container/GlobalState" { 
    const subscribeToGlobalState: (cb: Function) => Function;
    const getAppRoutes: () => [];

    export { subscribeToGlobalState, getAppRoutes }; 
} 