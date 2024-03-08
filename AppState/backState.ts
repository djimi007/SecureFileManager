import { create } from "zustand";

interface FocusedProps {
  isFoucsed: boolean;
  setIsFoucsed: (val: boolean) => void;
}

export const useFoucsed = create<FocusedProps>((set, get) => ({
  isFoucsed: false,
  setIsFoucsed: (val: boolean) => {
    return set({ isFoucsed: val });
  },
}));
