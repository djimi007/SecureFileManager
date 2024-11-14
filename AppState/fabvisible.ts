import { create } from "zustand";

interface Props {
  visibleFab: boolean;
  setFabVisible: (new_visible: boolean) => void;
}

interface DialogProp {
  visible: boolean;
  showDialog: () => void;
  dimissDialog: () => void;
}

export const useLayoutState = create<Props>((set) => ({
  visibleFab: false,
  setFabVisible: (new_visible: boolean) => set(() => ({ visibleFab: new_visible })),
}));

export const useDialogFolder = create<DialogProp>((set) => ({
  visible: false,
  showDialog: () => set({ visible: true }),
  dimissDialog: () => set({ visible: false }),
}));

export const useDialogImage = create<DialogProp>((set) => ({
  visible: false,
  showDialog: () => set({ visible: true }),
  dimissDialog: () => set({ visible: false }),
}));
