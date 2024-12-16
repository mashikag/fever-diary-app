import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { personsQueryOptions } from "@/features/persons/hooks/usePersons";
import { personQueryOptions } from "@/features/persons/hooks/usePerson";
import FeverDiaryIDBClient from "@/lib/idbClient";
import { getSelectedPersonId } from "@/lib/localStorage";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet, redirect } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

// Create the root route without redirect logic
export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  idbClient: FeverDiaryIDBClient;
}>()({
  beforeLoad: async ({ context: { queryClient } }) => {
    if (location.pathname === "/") {
      const persons = await queryClient.ensureQueryData(personsQueryOptions());

      if (persons.length) {
        let personId = getSelectedPersonId();

        if (!personId) {
          personId = persons[0].id;
        }

        let person;
        try {
          person = await queryClient.ensureQueryData(personQueryOptions(personId));
        } catch (error) {
          console.error(error);
        }

        if (person) {
          throw redirect({
            to: `/persons/${personId}/entries`,
          });
        } else {
          throw redirect({
            to: `/entries`,
          });
        }
      }

      throw redirect({
        to: "/welcome",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const shouldRenderSidebar = location.pathname !== "/welcome";

  if (shouldRenderSidebar) {
    return <WithSidebar />;
  }

  return <WithoutSidebar />;
}

export function WithoutSidebar() {
  return (
    <>
      <Header />
      <main className="flex flex-col py-8 max-w-2xl mx-auto">
        <Outlet />
        <TanStackRouterDevtools />
      </main>
    </>
  );
}

export function WithSidebar() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <div className="flex flex-col py-8 w-full max-w-screen-md mx-auto">
          <Outlet />
          <TanStackRouterDevtools />
        </div>
      </main>
    </SidebarProvider>
  );
}
