"use client";

import { Team } from "@/interface/teams";
import { useGetAllTeamQuery } from "@/Redux/api/teamApi/teamApi";
//import { useAppSelector } from "@/Redux/hooks";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

const MyTeam = () => {
  // const { token, user } = useAppSelector((state) => state.auth);
  const { data } = useGetAllTeamQuery("");
  console.log(data);
  const params = useParams();
  const userRole = params.userRole;

  console.log(userRole);

  return (
    <div className=" px-2">
      <h1 className="text-3xl font-bold mb-6 text-center">Team</h1>

      <div className="">
        {data?.data.map((team: Team) => (
          <div
            key={team._id}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
          >
            <div className="p-6">
              <div
                className=" bg-blue-950 px-5 rounded-xl py-3 text-white
              "
              >
                <h2 className="text-2xl font-semibold mb-2">{team.name}</h2>
                <p className=" mb-2">{team.tagLine}</p>{" "}
              </div>
              <div className="px-5">
                {" "}
                <div className="mb-4 mt-4">
                  <h3 className="font-medium text-gray-900">Team Leader</h3>
                  <div className="flex items-center mt-2">
                    {team.leader.image && (
                      <Image
                        src={`http://192.168.10.18:3500${team.leader.image}`}
                        alt={team.leader.fullName}
                        width={50}
                        height={50}
                        className="rounded-full w-14 h-14 mr-3"
                      />
                    )}
                    <div>
                      <p className="font-medium">{team.leader.fullName}</p>
                      <p className="text-sm text-gray-500">
                        {team.leader.position}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    Team Members ({team.members.length})
                  </h3>

                  <div className="flex gap-4 items-center">
                    {team.members.map((member) => (
                      <div key={member._id} className="flex  items-center">
                        {member.image && (
                          <Image
                            src={`http://192.168.10.18:3500${member.image}`}
                            alt={member.fullName}
                            width={50}
                            height={50}
                            className=" w-14 h-14 rounded-full mr-2"
                          />
                        )}
                        <div>
                          <p className="text-sm font-medium">
                            {member.fullName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {member.position}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Created: {new Date(team.createdAt).toLocaleDateString()}
                  </span>
                  {team.isDeleted && (
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                      Deleted
                    </span>
                  )}
                </div>
              </div>{" "}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTeam;
