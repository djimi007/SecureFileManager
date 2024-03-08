import { create } from "zustand";
import { initialPath } from "../utils/constant";
import { createJSONStorage, persist } from "zustand/middleware";
import zustandStorage from "./storage";

interface PathState {
  path: string;
  setPathOnPress: (fileName: string) => void;
  setPath: (new_path: string) => void;
  setPathOnBackPress: () => void;
  setInitialePath: () => void;
}

export const usePath = create(
  persist<PathState>(
    (set) => ({
      path: initialPath,
      setInitialePath: () => set({ path: initialPath }),
      setPath: (new_path: string) => set({ path: new_path }),
      setPathOnPress: (fileName: string) => {
        set((state) => ({ path: `${state.path}/${fileName}` }));
      },
      setPathOnBackPress: () =>
        set((state) => ({ path: state.path.substring(0, state.path.lastIndexOf("/")) })),
    }),
    {
      name: "path",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
