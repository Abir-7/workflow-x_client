import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useFormContext } from "react-hook-form";

interface InputFieldProps {
  name: string; // Field name
  label: string; // Label for the field
  type?: "text" | "email" | "number" | "password" | "date" | "file"; // Input types
  placeholder?: string; // Placeholder text
  className?: string; // Optional styling class
  validation?: object; // Validation rules for react-hook-form
}

const CInput: React.FC<InputFieldProps> = ({
  name,
  label,
  type = "text",
  placeholder = "",
  className = "",
  validation = {},
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4">
      <Label className="mb-1" htmlFor={name}>
        {label}
      </Label>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, validation)}
        className={` border border-gray-300 w-full mt-1 ${className}`}
      />
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default CInput;
