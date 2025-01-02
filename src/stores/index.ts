import { create } from "zustand";
import { createSidebarSlice } from "./sidebar";
import { AppState } from "./types";
import { createScreenSlice } from "./screen";
import { persist } from "zustand/middleware";
import createDeepMerge from "@fastify/deepmerge";

const deepMerge = createDeepMerge({ all: true });

export const useAppStore = create(
  persist<AppState>(
    (...a) => ({
      ...createSidebarSlice(...a),
      ...createScreenSlice(...a),
    }),
    {
      name: "app-storage",
      merge: (persistedState, currentState) => deepMerge(currentState, persistedState) as never,
    }
  )
);
