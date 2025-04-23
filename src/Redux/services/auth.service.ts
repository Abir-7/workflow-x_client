"use server";
import { jwtDecode } from "jwt-decode";

import { cookies } from "next/headers";

export const saveAccessToken = async (token: string) => {
  (await cookies()).set("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 60, // 60 days
  });
};

export const getCurrentUser = async () => {
  const token = (await cookies()).get("accessToken")?.value;

  let decode = null;

  if (token) {
    decode = await jwtDecode(token as string);
  }

  return await decode;
};

export const logout = async () => {
  (await cookies()).delete("accessToken");
};
