import { baseApi } from "../baseApi";

export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTeam: builder.mutation({
      query: (data) => ({
        url: "/teams/add-team",
        method: "POST",
        body: data,
      }),
    }),
    getAllTeam: builder.query({
      query: () => ({
        url: "/teams/",
        method: "GET",
      }),
    }),
    getTeamById: builder.query({
      query: (id: string) => ({
        url: `/teams/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAddTeamMutation, useGetAllTeamQuery, useGetTeamByIdQuery } =
  projectApi;
