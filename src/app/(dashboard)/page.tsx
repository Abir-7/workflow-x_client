import AdminDashboard from "@/components/page_components/dashboard/AdminDashboard";
import LeaderDashboard from "@/components/page_components/dashboard/LeaderDashboard";
import UserDashboard from "@/components/page_components/dashboard/UserDashboard";
import { getCurrentUser } from "@/Redux/services/auth.service";
import React from "react";

const Dashboard = async () => {
  // const { token, user } = useAppSelector((state) => state.auth);
  const user = await getCurrentUser();

  return (
    <div>
      {user.userRole === "USER" ? (
        <UserDashboard></UserDashboard>
      ) : user.userRole === "LEADER" ? (
        <LeaderDashboard></LeaderDashboard>
      ) : user.userRole === "ADMIN" ? (
        <AdminDashboard></AdminDashboard>
      ) : (
        <div className="mt-10 text-center">Wait a minute who are you</div>
      )}
    </div>
  );
};

export default Dashboard;
