import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (signupData) => ({
        url: "/user/create-user",
        method: "POST",
        body: signupData,
      }),
    }),
    verify: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-user",
        method: "PATCH",
        body: data,
      }),
    }),

    resendCode: builder.mutation({
      query: (data) => ({
        url: "/auth/resend-code",
        method: "PATCH",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (loginData) => ({
        url: "auth/login",
        method: "POST",
        body: loginData,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useVerifyMutation,
  useResendCodeMutation,
} = authApi;
