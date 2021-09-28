/**
 * Global Shared store Proxy Intance will be created with valtio.
 */
declare type User = {
    name: string;
    id: string;
};
interface GlobalState {
    user: User | null;
    setUser?: (data: User) => void;
    updateUser?: (data: User) => void;
}
/**
 * Global shared Store instance
 */
declare const globalStoreInstance: GlobalState;
/**
 * Mutating the global shared proxy instance,
 * Valtio will handle the Proxy logic
 */
export declare const updateUser: (user: User) => void;
export declare const useGlobalState: () => {
    user: {
        name: string;
        id: string;
    } | null;
    setUser?: ((data: User) => void) | undefined;
    updateUser?: ((data: User) => void) | undefined;
};
export default globalStoreInstance;
export declare const subscribeToGlobalState: (callback: (state: GlobalState) => void) => (() => void);
