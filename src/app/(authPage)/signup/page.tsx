/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CButton from "@/components/ui_components/form/CButton";
import CForm from "@/components/ui_components/form/CForm";
import CInput from "@/components/ui_components/form/CInput";
import { useSignupMutation } from "@/Redux/api/authApi/authApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const Singup = () => {
  const router = useRouter();
  const [createUser] = useSignupMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (formData: {
    email: string;
    password: string;
    fullName: string;
    phone: string;
    image: FileList;
  }) => {
    setIsSubmitting(true);
    const finalFormData = new FormData();

    if (formData.image && formData.image.length > 0) {
      finalFormData.append("image", formData.image[0]);
    }

    const dataObj = {
      email: formData.email,
      fullName: formData.fullName,
      phone: formData.phone,
      password: formData.password,
    };

    finalFormData.append("data", JSON.stringify(dataObj));
    const res = (await createUser(finalFormData)) as any;
    console.log(res);
    if (res?.error) {
      toast.error("Failed to create user.");
      setIsSubmitting(false);
    }
    if (res?.data?.success) {
      router.push(`/verify?email=${res.data.data.email}`);
      toast.success("User Created. Check your email.");
      setIsSubmitting(false);
    }
    console.log(res);
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
          Singup
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
              name="fullName"
              label="Name"
              placeholder="Your Name"
            ></CInput>
            <CInput
              name="phone"
              label="Mobile"
              type="number"
              placeholder="Your Mobile"
            ></CInput>
            <CInput
              name="password"
              label="Password"
              placeholder="Your Password"
            ></CInput>
            <CInput name="image" label="Profile Photo" type="file"></CInput>
            <CButton
              isSubmitting={isSubmitting}
              label="Signup"
              className="font-semibold w-full bg-blue-950 px-10 py-2 text-white rounded-2xl"
            ></CButton>
          </CForm>

          <div className="flex gap-1 mt-3 justify-center">
            <p className=" ">Don&apos;t have an account? </p>
            <Link
              className="text-blue-700 font-medium hover:underline"
              href={"/login"}
            >
              Click Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singup;
