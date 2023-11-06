import { Store } from "pullstate";
let initialState = {
  isLoggedIn: false,
};
type IStore = {
  isLoggedIn: boolean;
};
export const dataStore = new Store<IStore>(initialState);

export function setLoggedIn(data: boolean) {
  return dataStore.update((s) => {
    s.isLoggedIn = data;
  });
}
