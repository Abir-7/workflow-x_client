/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui_components/dashboard/Sidebar";
import { logoutUserData } from "@/Redux/feature/authSlice/authSlice";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { logout } from "@/Redux/services/auth.service";

import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { token, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!token || !user) {
      console.log("object");
      router.push("/login");
    }
  }, [token, user]);

  const logoutUser = async () => {
    await logout();
    dispatch(logoutUserData());
  };

  return (
    <div className="relative  overflow-hidden">
      <SidebarProvider className="">
        <AppSidebar /> <button onClick={logoutUser}>logut</button>
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
