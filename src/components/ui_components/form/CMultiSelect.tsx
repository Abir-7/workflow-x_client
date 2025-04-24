"use cleint";
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
}

const CMultiSelect = ({ name, options }: CMultiSelectProps) => {
  const { control } = useFormContext(); // Access the form context
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelectMember = (member: Member) => {
    setSelectedMembers((prev) => {
      const isSelected = prev.some((m) => m.id === member.id);
      if (isSelected) {
        return prev.filter((m) => m.id !== member.id);
      } else {
        return [...prev, member];
      }
    });
  };

  const getPlaceholderText = () => {
    if (selectedMembers?.length === 0) return "Select members";
    return `${selectedMembers?.length} members selected`;
  };

  return (
    <div className="w-full max-w-md">
      <Label className="mb-1">Select Members</Label>

      <div className="relative">
        <button
          type="button"
          onClick={toggleDropdown}
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-left flex justify-between items-center bg-white shadow-xs text-[14px] transition-colors"
        >
          <span
            className={`${selectedMembers.length === 0 ? "" : "text-gray-800"}`}
          >
            {getPlaceholderText()}
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
                    checked={selectedMembers.some((m) => m.id === member.id)}
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

      {/* Register component with react-hook-form */}
      <Controller
        name={name}
        control={control} // Use the control from useFormContext
        defaultValue={selectedMembers} // Set default value if necessary
        render={({ field }) => (
          <input
            type="hidden"
            {...field}
            value={JSON.stringify(selectedMembers)} // Store selected members as a JSON string
          />
        )}
      />
    </div>
  );
};

export default CMultiSelect;
