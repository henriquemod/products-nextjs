"use client";
import { createStore } from "zustand/vanilla";

export type UserState = {
  accessToken?: string;
};

export type UserActions = {
  setAccessToken: (accessToken: string) => void;
  clearAccessToken: () => void;
};

export type UserStore = UserState & UserActions;

export const initUserStore = (): UserState => {
  return { accessToken: undefined };
};

export const defaultInitState: UserState = {
  accessToken: undefined,
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()((set) => {
    return {
      ...initState,
      setAccessToken: (accessToken) => {
        set(() => ({
          accessToken,
        }));
      },
      clearAccessToken: () => {
        set(() => ({
          accessToken: undefined,
        }));
      },
    };
  });
};
