import { baseApi } from "../baseApi";

export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProject: builder.mutation({
      query: (data) => ({
        url: "/projects/add-project",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddProjectMutation } = projectApi;
