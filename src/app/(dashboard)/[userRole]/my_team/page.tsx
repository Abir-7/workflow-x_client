"use client";

import { useParams } from "next/navigation";
import React from "react";

const MyTeam = () => {
  const params = useParams();
  const userRole = params.userRole;

  console.log(userRole);

  return <div>My Team Page for {userRole}</div>;
};

export default MyTeam;
