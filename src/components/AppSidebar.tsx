import { Plus } from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSkeleton,
} from "./ui/sidebar";
import { usePersons } from "@/features/persons/hooks/useGetPersons";
import { useNavigate } from "@tanstack/react-router";

function PersonsSidebarGroup() {
  const navigate = useNavigate();
  const { data, isLoading } = usePersons();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Persons</SidebarGroupLabel>
      <SidebarGroupAction title="Add Project">
        <Plus /> <span className="sr-only">Add Project</span>
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu>
          {isLoading && [<SidebarMenuSkeleton />, <SidebarMenuSkeleton />, <SidebarMenuSkeleton />]}
          {data?.map((person) => (
            <SidebarMenuItem key={person.id}>
              <SidebarMenuButton
                onClick={() => {
                  navigate({ to: `/persons/${person.id}/entries` });
                }}
              >
                {person.name}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <PersonsSidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

export default AppSidebar;
