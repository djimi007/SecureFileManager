import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import zustandStorage from "./storage";

interface Props {
  firstLaunch: boolean;
  setFirstLaunch: (bool: boolean) => void;
}

export const useFirstLaunch = create(
  persist<Props>(
    (set) => ({
      firstLaunch: false,
      setFirstLaunch: (bool: boolean) => set({ firstLaunch: bool }),
    }),
    {
      name: "first_launch",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
