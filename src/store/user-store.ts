import { ApiResponse } from "@/domain/api-reponse";
import { createStore } from "zustand/vanilla";

export type UserState = {
  accessToken?: string;
};

export type UserActions = {
  setAccessToken: (accessToken: string) => void;
  clearAccessToken: () => Promise<ApiResponse>;
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
      clearAccessToken: async (): Promise<ApiResponse> => {
        const res = await fetch("http://localhost:3000/api/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });

        set(() => ({
          accessToken: undefined,
        }));

        if (res.status === 204) {
          return { type: "OK" };
        }

        return {
          type: "BAD_REQUEST",
          message: "Error while logging out",
        };
      },
    };
  });
};
