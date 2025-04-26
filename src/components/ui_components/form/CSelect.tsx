/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useFormContext } from "react-hook-form";

interface SelectFieldProps {
  name: string; // Field name
  label: string; // Label for the select
  options: { value: string | number; label: string }[]; // Options for the select
  placeholder?: string; // Placeholder text
  validation?: object; // Validation rules for react-hook-form
  defaultValue?: string;
}

const CSelect: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
  placeholder,
  defaultValue = "",
  validation = {},
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-6 max-w-full w-full">
      <label
        htmlFor={name}
        className="flex gap-2 text-sm font-medium text-gray-900"
      >
        {label}
        {Object.keys(validation).length > 0 && (
          <p className="text-red-500">*</p>
        )}
      </label>
      <div className="relative ">
        <select
          disabled={options.length <= 0}
          id={name}
          className={`block w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-md shadow-xs focus:outline-none focus:ring-3 focus:ring-gray-300 focus:border-gray-400 ${
            errors[name] ? "border-red-500" : "border-gray-300"
          } appearance-none transition duration-300 ease-in-out`}
          {...register(name, validation)}
          defaultValue={defaultValue}
        >
          {/* Disabled option for placeholder with custom color */}
          {placeholder && (
            <option value="" disabled className="text-gray-200">
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={String(option.value)}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </div>{" "}
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default CSelect;
