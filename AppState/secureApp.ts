import { create } from "zustand";

import { persist, createJSONStorage } from "zustand/middleware";

import * as RNFS from "react-native-fs";
import zustandStorage from "./storage";
import { LocalAuthentication } from "../utils/constant";

type StateProp = {
  secure: boolean;

  setSecure: (val: boolean) => Promise<void>;
  getResult: () => Promise<boolean>;
  checkAuth: () => Promise<void>;
};

const useSecureApp = create(
  persist<StateProp>(
    (set, get) => ({
      secure: false,
      result: false,
      checkAuth: async () => {
        if (!get().secure) {
          if (await get().getResult()) {
            set({ secure: false });
          } else {
            get().checkAuth();
          }
        }
      },
      getResult: async () => {
        return (await LocalAuthentication.authenticateAsync()).success;
      },
      setSecure: async (val: boolean) => {
        if (!val && (await get().getResult())) {
          set({ secure: val });
        } else {
          set({ secure: true });
        }
      },
    }),
    {
      name: "secure",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export default useSecureApp;
