import { proxy, snapshot, useSnapshot } from 'valtio';

/**
 * Global Shared store Proxy Intance will be created with valtio.
 */
type User = {
    name: string;
    id: string;
}
type AppRouutes = {
  app: string,
  routes: Record<string, string>
}[]

interface GlobalState {
  user: User | null,
  appRoutes: AppRouutes | [];
  setRoutes?: (route: AppRouutes) => void;
  setUser?: (data: User) => void,
  updateUser?: (data:User) => void
}

/**
 * Global shared Store instance
 */
const globalStoreInstance = proxy<GlobalState>({
    user: null,
    appRoutes: []
});

/**
 * Mutating the global shared proxy instance,
 * Valtio will handle the Proxy logic
 */
export const updateUser = (user: User) => {
    globalStoreInstance.user = user;
    console.log(snapshot(globalStoreInstance));

    // We assign it to the global window, since we want to access the
    // same instance at runtime in the store file that we are exposing.
    // If we don't assign to window and try to use the import instead,
    // we will get different instance of proxy.
    //@ts-ignore
    window['globalState'] = globalStoreInstance;
}

export const useGlobalState = () => {
  return useSnapshot(globalStoreInstance);
}

export const setRoutes = (route: AppRouutes) => {
  console.log(route);
  globalStoreInstance.appRoutes = [
    ...globalStoreInstance.appRoutes,
    ...route
  ];

     // We assign it to the global window, since we want to access the
    // same instance at runtime in the store file that we are exposing.
    // If we don't assign to window and try to use the import instead,
    // we will get different instance of proxy.
    //@ts-ignore
    window['globalState'] = globalStoreInstance;
}

export default globalStoreInstance;