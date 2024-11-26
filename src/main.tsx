import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import Header from "@/components/Header";
import FeverDiaryIDBClient from "@/lib/idbClient";
import "./index.css";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const appContext = {
  feverDiaryClient: FeverDiaryIDBClient.getInstance(),
};

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Header />
      <main className="flex flex-col py-8">
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} context={appContext} />
        </QueryClientProvider>
      </main>
    </React.StrictMode>
  );
}
