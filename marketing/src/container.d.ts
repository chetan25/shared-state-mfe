declare module "container/GlobalState" { 
    const subscribeToGlobalState: (cb: Function) => Function;

    export { subscribeToGlobalState }; 
} 