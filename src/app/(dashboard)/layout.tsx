/* eslint-disable react-hooks/exhaustive-deps */
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
      console.log("object");
      router.push("/login");
    }
  }, [token, user]);

  return (
    <div className="relative h-screen  overflow-hidden">
      <SidebarProvider className="h-full">
        <AppSidebar />
        <div className="w-full overflow-y-auto">
          <SidebarTrigger />
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
