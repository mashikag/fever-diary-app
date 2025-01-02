import { AppState } from "../types";

export const isSidebarExpanded = (state: AppState) =>
  state.screen.isMobile ? state.sidebar.isMobileOpen : state.sidebar.isOpen;

export const isMobileSelector = (state: AppState) => state.sidebar.isMobileOpen;

export const toggleSelector = (state: AppState) => state.sidebar.toggle;
