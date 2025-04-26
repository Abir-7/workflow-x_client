"use client";

import { useAppSelector } from "@/Redux/hooks";
import { useParams } from "next/navigation";
import React from "react";

const MyTeam = () => {
  const { token, user } = useAppSelector((state) => state.auth);

  const params = useParams();
  const userRole = params.userRole;

  console.log(userRole);

  return <div>My Team Page for {userRole}</div>;
};

export default MyTeam;
