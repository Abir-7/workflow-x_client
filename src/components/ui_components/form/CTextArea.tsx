import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useFormContext } from "react-hook-form";

interface TextAreaFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  className?: string;
  validation?: object;
  rows?: number;
}

const CTextArea: React.FC<TextAreaFieldProps> = ({
  name,
  label,
  placeholder = "",
  className = "",
  validation = {},
  rows = 4,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4">
      <Label className="mb-1" htmlFor={name}>
        {label}{" "}
        {Object.keys(validation).length > 0 && (
          <span className="text-red-500">*</span>
        )}
      </Label>
      <Textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        {...register(name, validation)}
        className={`border border-gray-300 w-full mt-1 ${className}`}
      />
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default CTextArea;
