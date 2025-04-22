"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui_components/dashboard/Sidebar";
import { useAppSelector } from "@/Redux/hooks";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { token, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!token || !user) {
      router.push("/login");
    }
  }, [token, user]);

  return (
    <div className="relative  overflow-hidden">
      <SidebarProvider className="">
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
