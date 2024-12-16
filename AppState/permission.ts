import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import zustandStorage from "./storage";

interface PermissionProp {
  hasExternalStoragePermission: boolean;
  setExternalStoragePermission: (bool: boolean) => void;
}

const useExternalStoragePermission = create(
  persist<PermissionProp>(
    (set) => ({
      hasExternalStoragePermission: false,
      setExternalStoragePermission: (bool: boolean) =>
        set({ hasExternalStoragePermission: bool ? true : false }),
    }),
    {
      name: "permissions-storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export { useExternalStoragePermission };
