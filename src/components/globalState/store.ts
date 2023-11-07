import { Store } from "pullstate";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export const asyncKeys = {
  // clear in logout time
  token: "@token",
};

export const setAsyncToken = async (token: string) => {
  await AsyncStorage.setItem(asyncKeys.token, JSON.stringify(token));
};
