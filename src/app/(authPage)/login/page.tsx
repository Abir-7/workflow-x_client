"use client";
import CButton from "@/components/ui_components/form/CButton";
import CForm from "@/components/ui_components/form/CForm";
import CInput from "@/components/ui_components/form/CInput";
import { useLoginMutation } from "@/Redux/api/authApi/authApi";
import { login } from "@/Redux/feature/authSlice/authSlice";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { getCurrentUser, saveAccessToken } from "@/Redux/services/auth.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Login = () => {
  const dispatch = useAppDispatch();
  const { token, user } = useAppSelector((state) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [loginUser] = useLoginMutation();
  const onSubmit = async (data: { email: string; password: string }) => {
    const res = await loginUser(data);
    console.log(res);
    if (res?.error) {
      toast.error("Failed to login. Check email or password.");
      setIsSubmitting(false);
    }
    if (res?.data?.success) {
      await saveAccessToken(res.data.data.accessToken);
      const user = await getCurrentUser();
      dispatch(login({ token: res.data.data.accessToken, user: user }));
      toast.success("Login Success");
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    if (token) {
      router.push(`/${user?.userRole.toLowerCase()}`);
    }
  }, [token, user]);

  return (
    <div className="  bg-stone-100  overflow-y-auto   h-screen grid  lg:grid-cols-2 items-center">
      <div className="bg-blue-950 h-full grid items-center">
        <div className="p-5 sm:p-10">
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-100 text-center">
            WELCOME
          </h1>

          <h1 className=" text-2xl sm:text-4xl font-bold text-slate-100 text-center">
            TO
          </h1>
          <h1 className=" text-4xl sm:text-6xl font-bold text-slate-100 text-center">
            WORKFLOW-X
          </h1>
        </div>
      </div>
      <div className="  sm:shadow-2xl  rounded-xl sm:mx-10">
        <h1 className="text-5xl font-bold text-center  pt-5    sm:pt-5">
          Login
        </h1>
        <div className=" px-5 p-10 sm:px-10 xl:px-20  pt-5 sm:pt-10 ">
          <CForm onSubmit={onSubmit}>
            <CInput
              name="email"
              label="Email"
              type="email"
              placeholder="Your Email"
            ></CInput>
            <CInput
              name="password"
              label="Password"
              placeholder="Your Password"
            ></CInput>

            <CButton
              isSubmitting={isSubmitting}
              label="Login"
              className="font-semibold w-full bg-blue-950 px-10 py-2 text-white rounded-2xl"
            ></CButton>
          </CForm>

          <div className="flex gap-1 mt-3 justify-center">
            <p className=" ">Don&apos;t have an account? </p>
            <Link
              className="text-blue-700 font-medium hover:underline"
              href={"/signup"}
            >
              Click Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
