import { useAppStore } from "@/stores";
import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useScreenWatcher() {
  const setMobile = useAppStore((state) => state.screen.setMobile);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
}
