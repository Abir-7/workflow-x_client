import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserNotInAnyTeam: builder.query({
      query: () => ({
        url: "/user/all-user-not-in-any-team",
        method: "GET",
      }),
    }),
    getAllLeader: builder.query({
      query: () => ({
        url: "/user/all-leader",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllUserNotInAnyTeamQuery, useGetAllLeaderQuery } = userApi;
