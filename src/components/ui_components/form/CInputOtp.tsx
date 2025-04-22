import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React from "react";
import { useFormContext } from "react-hook-form";

interface InputOTPFieldProps {
  name: string;
  label: string;
  maxLength?: number;
  className?: string;
}

const CInputOTP: React.FC<InputOTPFieldProps> = ({
  name,

  maxLength = 6,
  className = "",
}) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4 flex justify-center">
      {/* OTP Input */}
      <InputOTP
        maxLength={maxLength}
        pattern={REGEXP_ONLY_DIGITS}
        onChange={(value) => setValue(name, value)}
        className={`mt-1  ${className}`}
      >
        <InputOTPGroup className="">
          {Array.from({ length: maxLength }).map((_, index) => (
            <InputOTPSlot className="w-12 h-12" key={index} index={index} />
          ))}
        </InputOTPGroup>
      </InputOTP>

      {/* Hidden input for form control */}
      <input
        type="hidden"
        id={name}
        {...register(name, { required: "OTP is required" })}
      />

      {/* Error message */}
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default CInputOTP;
