"use client";
import CButton from "@/components/ui_components/form/CButton";
import CForm from "@/components/ui_components/form/CForm";
import CInput from "@/components/ui_components/form/CInput";
import Link from "next/link";
import React from "react";

const Login = () => {
  const onSubmit = async (data: { email: string; password: string }) => {
    console.log(data);
  };
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
