import { proxy, snapshot, useSnapshot } from 'valtio';

/**
 * Global Shared store Proxy Intance will be created with valtio.
 */
type User = {
    name: string;
    id: string;
}
interface GlobalState {
  user: User | null,
  setUser?: (data: User) => void,
  updateUser?: (data:User) => void
}

/**
 * Global shared Store instance
 */
const globalStoreInstance = proxy<GlobalState>({
    user: null
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

export default globalStoreInstance;