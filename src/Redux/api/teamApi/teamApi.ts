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
  }),
});

export const { useAddTeamMutation } = projectApi;
