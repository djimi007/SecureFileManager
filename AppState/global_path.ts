import { create } from "zustand";

import { persist, createJSONStorage } from "zustand/middleware";

import * as RNFS from "react-native-fs";
import zustandStorage from "./storage";

type StateProp = {
  path: string;
  pathChangeOnPerss: (fileName: string) => void;
  pathChangeOnBack: () => void;
  secure: boolean;
  setSecure: (newsecure: boolean) => void;
  getSecure: () => boolean;
};

const useStateApp = create(
  persist<StateProp>(
    (set, get) => ({
      path: RNFS.ExternalStorageDirectoryPath + "/Pictures/Progallery",
      pathChangeOnPerss: (fileName: string) =>
        set((state) => ({ path: `${state.path}/${fileName}` })),
      pathChangeOnBack: () =>
        set((state) => ({ path: state.path.substring(state.path.lastIndexOf("/")) })),
      secure: false,
      setSecure: (newsecure: boolean) => set(() => ({ secure: newsecure })),
      getSecure: () => get().secure,
    }),
    {
      name: "path-secure",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export default useStateApp;
