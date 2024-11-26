import { createRootRoute, redirect } from "@tanstack/react-router";

// Create the root route without redirect logic
export const Route = createRootRoute({
  beforeLoad: () => {
    if (location.pathname === "/") {
      throw redirect({
        to: "/welcome",
      });
    }
  },
});
