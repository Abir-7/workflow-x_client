import { Button } from "@/components/ui/button";
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
import { logoutUserData } from "@/Redux/feature/authSlice/authSlice";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { logout } from "@/Redux/services/auth.service";
import { Home, User } from "lucide-react";
import Link from "next/link";

export function AppSidebar() {
  const dispatch = useAppDispatch();
  const logoutUser = async () => {
    await logout();
    dispatch(logoutUserData());
  };
  const { user } = useAppSelector((state) => state.auth);

  const allRoutes = [
    {
      name: "Dashboard",

      child: [
        {
          name: "Dashboard Data",
          path: "/",
          role: ["ADMIN", "LEADER", "USER"],
          icon: User,
        },
      ],
    },
    {
      name: "Manage User",
      child: [
        {
          name: "All User",
          path: "/admin/manage_users",
          icon: User,
          role: ["ADMIN"],
        },
      ],
    },
    {
      name: "Manage Project",
      child: [
        {
          name: "Add Project",
          path: `/${user?.userRole.toLowerCase()}/add_project`,
          icon: Home,
          role: ["ADMIN", "LEADER"],
        },
        {
          name: "Running Projects",
          path: "/user/add_project",
          icon: Home,
          role: ["USER"],
        },
        {
          name: "Completed Project",
          path: "/user/add_project",
          icon: Home,
          role: ["USER"],
        },
      ],
    },
    {
      name: "Manage Team",
      child: [
        {
          name: "Add Team",
          path: `/${user?.userRole.toLowerCase()}/add_team`,
          icon: Home,
          role: ["ADMIN", "LEADER"],
        },
        {
          name: "My Team",
          path: `/${user?.userRole.toLowerCase()}/my_team`,
          icon: Home,
          role: ["USER", "LEADER"],
        },
      ],
    },
    {
      name: "Manage Project Groups",
      child: [
        {
          name: "Add Group",
          path: `/${user?.userRole.toLowerCase()}/add_project_group`,
          icon: Home,
          role: ["ADMIN", "LEADER"],
        },
        {
          name: "All Groups",
          path: `/${user?.userRole.toLowerCase()}/my_team`,
          icon: Home,
          role: ["ADMIN"],
        },
      ],
    },
  ];
  console.log(user);
  const routes = allRoutes
    .map((route) => {
      const allowedChildren = route.child.filter((child) =>
        child.role.includes(user?.userRole as string)
      );
      if (allowedChildren.length > 0) {
        return { ...route, child: allowedChildren };
      }
      return null;
    })
    .filter(Boolean);

  return (
    <Sidebar className="absolute ">
      <SidebarContent className="bg-blue-950 text-white">
        <SidebarGroup className="h-full">
          {routes?.map((route, i) => (
            <div key={i} className="mb-2">
              <SidebarGroupLabel className="text-xl text-white mb-1 ">
                {route?.name}
              </SidebarGroupLabel>
              <hr className="mb-1" />
              <SidebarGroupContent>
                <SidebarMenu>
                  {route?.child?.map((item, i) => (
                    <SidebarMenuItem key={i}>
                      <SidebarMenuButton asChild>
                        <Link href={item.path} className="">
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
        <div className="p-2 ">
          <Button className="w-full" onClick={logoutUser}>
            logut
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
