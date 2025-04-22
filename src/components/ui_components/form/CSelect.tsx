import React from "react";
import { useFormContext } from "react-hook-form";

interface SelectFieldProps {
  name: string; // Field name
  label: string; // Label for the select
  options: { value: string | number; label: string }[]; // Options for the select
  placeholder?: string; // Placeholder text
  className?: string; // Optional styling class
  validation?: object; // Validation rules for react-hook-form
}

const CSelect: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
  placeholder = "Select an option",
  className = "",
  validation = {},
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={name}
        {...register(name, validation)}
        className={`select select-bordered w-full mt-1 ${className}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default CSelect;
