import { proxy, snapshot, useSnapshot, subscribe } from 'valtio';
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
}
export const useGlobalState = () => {
  return useSnapshot(globalStoreInstance);
}
export default globalStoreInstance;
export const subscribeToGlobalState = (
    callback: (state: GlobalState) => void
  ): (() => void) => {
    const store = globalStoreInstance;
    const state = snapshot(store);
    if (!store) {
      return () => {};
    }
    callback(state);
    return subscribe(store, () => {
      console.log("user changed");
      callback(snapshot(store));
    });
  };