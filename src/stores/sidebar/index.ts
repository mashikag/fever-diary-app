import { AppState, SidebarSlice } from "../types";
import { StateCreator } from "zustand";

export const createSidebarSlice: StateCreator<AppState, [], [], SidebarSlice> = (set) => ({
  sidebar: {
    state: "expanded",
    isOpen: true,
    isMobileOpen: false,
    setOpen: (open: boolean) =>
      set((state) => ({
        sidebar: {
          ...state.sidebar,
          isOpen: open,
          state: open ? "expanded" : "collapsed",
        },
      })),
    setMobileOpen: (open: boolean) =>
      set((state) => ({ sidebar: { ...state.sidebar, isMobileOpen: open } })),
    toggle: () =>
      set((state) => ({
        sidebar: {
          ...state.sidebar,
          isOpen: !state.screen.isMobile ? !state.sidebar.isOpen : state.sidebar.isOpen,
          isMobileOpen: state.screen.isMobile ? !state.sidebar.isMobileOpen : state.sidebar.isOpen,
          state: !state.sidebar.isOpen ? "expanded" : "collapsed",
        },
      })),
  },
});
