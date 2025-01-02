export type AppState = SidebarSlice & ScreenSlice;

export type SidebarSlice = {
  sidebar: {
    state: "expanded" | "collapsed";
    isOpen: boolean;
    isMobileOpen: boolean;
    setOpen: (open: boolean) => void;
    setMobileOpen: (open: boolean) => void;
    toggle: () => void;
  };
};

export type ScreenSlice = {
  screen: {
    isMobile: boolean;
    setMobile: (isMobile: boolean) => void;
  };
};
