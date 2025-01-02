import { ScreenSlice } from "../types";
import { StateCreator } from "zustand";

export const createScreenSlice: StateCreator<ScreenSlice> = (set) => ({
  screen: {
    isMobile: false,
    setMobile: (isMobile) => set((state) => ({ screen: { ...state.screen, isMobile } })),
  },
});
