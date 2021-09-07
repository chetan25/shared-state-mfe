import { subscribe, snapshot } from 'valtio';

type User = {
    name: string;
    id: string;
}
interface GlobalState {
  user: User | null,
  setUser?: (data: User) => void,
  updateUser?: (data:User) => void
}


export const subscribeToGlobalState = (
    callback: (state: GlobalState) => void
  ): (() => void) => {
     // @ts-ignore
     const store = window['globalState'];
     const state = snapshot(store); 
    if(!store) {
      return () => {}
    }
    callback(state);
    return subscribe(store, () => {
        console.log('user changed')
        callback(snapshot(store))
    });
  };