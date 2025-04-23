import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAppSelector } from "@/Redux/hooks";
import { Home, User } from "lucide-react";
import Link from "next/link";

export function AppSidebar() {
  const { token, user } = useAppSelector((state) => state.auth);
  const routes = [
    {
      name: "Manage User",
      child: [
        {
          name: "All User",
          path: "/admin/manage_users",
          role: ["ADMIN"],
          icon: User,
        },
      ],
    },
    {
      name: "Manage Project",
      child: [
        {
          name: "Add Project",
          path: "/admin/add_project",
          role: ["ADMIN", "LEADER"],
          icon: Home,
        },
      ],
    },
    {
      name: "Manage Team",
      child: [
        {
          name: "Add Team",
          path: "/admin/add_project",
          role: ["ADMIN", "LEADER"],
          icon: Home,
        },
      ],
    },
  ];
  return (
    <Sidebar className="absolute ">
      <SidebarContent className="bg-blue-950 text-white">
        <SidebarGroup>
          {routes.map((route, i) => (
            <div key={i} className="mb-2">
              <SidebarGroupLabel className="text-xl text-white ">
                {route.name}
              </SidebarGroupLabel>
              <hr />
              <SidebarGroupContent>
                <SidebarMenu>
                  {route.child.map((item, i) => (
                    <SidebarMenuItem key={i}>
                      <SidebarMenuButton asChild>
                        <Link href={item.path} className="mt-2">
                          <item.icon />
                          <span className="text-base font-semibold">
                            {item.name}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </div>
          ))}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
