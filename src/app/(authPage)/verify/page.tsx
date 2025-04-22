/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import CButton from "@/components/ui_components/form/CButton";
import CForm from "@/components/ui_components/form/CForm";

import CInputOTP from "@/components/ui_components/form/CInputOtp";
import {
  useResendCodeMutation,
  useVerifyMutation,
} from "@/Redux/api/authApi/authApi";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const VerificationCode = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();
  const [verifyUser] = useVerifyMutation();
  const [resendVerificationCode] = useResendCodeMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (formData: { otp: number }) => {
    setIsSubmitting(true);
    const res = (await verifyUser({ otp: formData.otp, email })) as any;
    console.log(res);
    if (res?.error?.data?.success === false) {
      toast.error(`Failed to verify user. ${res?.error?.data.message}`);
      setIsSubmitting(false);
    }
    if (res?.data?.success) {
      router.push(`/login`);
      toast.success("Verification Successfull.");
      setIsSubmitting(false);
    }
  };

  const resendCode = async (data: { email: string }) => {
    const res = await resendVerificationCode({ email: data.email });
    if (res?.data?.success) {
      toast.success("Verification code sent Successfully.");
    } else {
      toast.success("Something went wrong. Try again.");
    }
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
          Verification Code
        </h1>
        <div className=" px-5 p-10 sm:px-10 xl:px-20  pt-5 sm:pt-10 ">
          <CForm onSubmit={onSubmit}>
            <CInputOTP
              maxLength={4}
              label="Verification Code"
              name="otp"
            ></CInputOTP>
            <CButton
              isSubmitting={isSubmitting}
              label="Submit"
              className="font-semibold w-full bg-blue-950 px-10 py-2 text-white rounded-2xl"
            ></CButton>
          </CForm>

          <div className="flex gap-1 mt-3 justify-center">
            <Button
              onClick={() => {
                resendCode({ email: email! });
              }}
            >
              Resend Code
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationCode;
