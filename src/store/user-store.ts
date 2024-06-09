import { ApiResponse } from "@/domain/api-response";
import { createStore } from "zustand/vanilla";
import { handleErrorResponse } from "./helpers/handle-error-response";

export type UserState = {
  accessToken?: string;
};

export type UserActions = {
  setAccessToken: (accessToken: string) => void;
  clearAccessToken: () => Promise<ApiResponse>;
  authenticate: (username: string, password: string) => Promise<ApiResponse>;
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
      authenticate: async (
        username: string,
        password: string
      ): Promise<ApiResponse> => {
        const res = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        if (res.status === 200) {
          const data = await res.json();
          set(() => ({
            accessToken: data.accessToken,
          }));

          return { type: "OK" };
        }

        return handleErrorResponse(res);
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

        return handleErrorResponse(res);
      },
    };
  });
};
