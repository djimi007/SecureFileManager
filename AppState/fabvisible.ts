import { create } from "zustand";

interface Props {
  visibleFab: boolean;
  setFabVisible: (new_visible: boolean) => void;
}

export const useLayoutState = create<Props>((set) => ({
  visibleFab: false,
  setFabVisible: (new_visible: boolean) => set(() => ({ visibleFab: new_visible })),
}));
