"use client";

import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";

interface Member {
  id: number;
  name: string;
}

interface CMultiSelectProps {
  name: string;
  options: Member[];
  required?: boolean;
}

const CMultiSelect = ({
  name,
  options,
  required = false,
}: CMultiSelectProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const getPlaceholderText = (selected: Member[]) => {
    if (!selected || selected.length === 0) return "Select members";
    return `${selected.length} members selected`;
  };

  return (
    <div className="w-full max-w-md mb-6">
      <Label className="mb-1">
        Select Members {required && <p className="text-red-500">*</p>}
      </Label>
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        rules={
          required
            ? {
                validate: (value: Member[]) =>
                  value.length > 0 || "Please select at least one member",
              }
            : {}
        }
        render={({ field }) => {
          const selectedMembers: Member[] = field.value || [];

          const handleSelectMember = (member: Member) => {
            const isSelected = selectedMembers.some((m) => m.id === member.id);
            const newSelected = isSelected
              ? selectedMembers.filter((m) => m.id !== member.id)
              : [...selectedMembers, member];

            field.onChange(newSelected);
          };

          return (
            <>
              <div className="relative">
                <button
                  type="button"
                  onClick={toggleDropdown}
                  className={`w-full px-4 py-2 border ${
                    errors[name] ? "border-red-500" : "border-gray-300"
                  } rounded-md text-left flex justify-between items-center bg-white shadow-xs text-[14px] transition-colors`}
                >
                  <span
                    className={`${
                      selectedMembers.length === 0 ? "" : "text-gray-800"
                    }`}
                  >
                    {getPlaceholderText(selectedMembers)}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isOpen && (
                  <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    <ul className="py-1">
                      {options.map((member) => (
                        <li
                          key={member.id}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                          onClick={() => handleSelectMember(member)}
                        >
                          <input
                            type="checkbox"
                            checked={selectedMembers.some(
                              (m) => m.id === member.id
                            )}
                            readOnly
                            className="mr-2 rounded text-blue-500 focus:ring-blue-400"
                          />
                          <span>{member.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {errors[name] && (
                <p className="text-sm text-red-500 mt-1">
                  {errors[name]?.message as string}
                </p>
              )}
            </>
          );
        }}
      />
    </div>
  );
};

export default CMultiSelect;
