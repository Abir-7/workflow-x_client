/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Trash2, Plus } from "lucide-react";
import { format } from "date-fns";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CMultiSelect from "./CMultiSelect";

type TPhase =
  | "UI/UX"
  | "R&D"
  | "API_DEVELOPMENT"
  | "API_INTIGRATION"
  | "DASHBOARD_DESIGN"
  | "DASHBOARD_INTIGRATION"
  | "WEBSITE_DESIGN"
  | "WEBSITE_DEPLOYMENT"
  | "APP_DEPLOYMENT"
  | "APP_DESIGN";

type IPhaseStatus = "ACTIVE" | "INACTIVE";

const phases: TPhase[] = [
  "UI/UX",
  "R&D",
  "API_DEVELOPMENT",
  "API_INTIGRATION",
  "DASHBOARD_DESIGN",
  "DASHBOARD_INTIGRATION",
  "WEBSITE_DESIGN",
  "WEBSITE_DEPLOYMENT",
  "APP_DEPLOYMENT",
  "APP_DESIGN",
];

interface CInputArrayProps {
  requiredMessage?: string | false;
}

export function CInputArray({
  requiredMessage = "This field is required",
}: CInputArrayProps) {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "phases",
  });

  if (fields.length === 0) {
    append({
      name: "" as TPhase,
      budget: 0,
      members: [],
      deadline: "",
      status: "INACTIVE" as IPhaseStatus,
    });
  }

  return (
    <div className="space-y-4 mt-4">
      <Label>Project Phases</Label>

      {fields.map((field, index) => (
        <div key={field.id} className="border p-4 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <Label>Phase {index + 1} </Label>
            {index > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
            )}
          </div>

          {/* Phase Name and Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-1" htmlFor={`phases.${index}.name`}>
                Phase Name{" "}
                {requiredMessage !== false && <p className="text-red-500">*</p>}
              </Label>
              <Controller
                name={`phases.${index}.name`}
                control={control}
                rules={{ required: requiredMessage }}
                render={({ field, fieldState }) => (
                  <div>
                    <select
                      {...field}
                      id={`phases.${index}.name`}
                      className={`block w-full px-4 py-2 pr-10 text-sm border ${
                        fieldState.error ? "border-red-500" : "border-gray-300"
                      } rounded-md shadow-xs focus:outline-none focus:ring-3 ${
                        fieldState.error
                          ? "focus:ring-red-500"
                          : "focus:ring-gray-300"
                      } appearance-none transition duration-300 ease-in-out`}
                    >
                      <option value="" disabled>
                        Select Phase Name
                      </option>
                      {phases.map((phase) => (
                        <option key={phase} value={phase}>
                          {phase.replace(/_/g, " ")}
                        </option>
                      ))}
                    </select>
                    {fieldState.error && (
                      <p className="text-red-500 text-sm mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            <div>
              <Label className="mb-1" htmlFor={`phases.${index}.budget`}>
                Budget ($){" "}
                {requiredMessage !== false && <p className="text-red-500">*</p>}
              </Label>
              <Controller
                control={control}
                name={`phases.${index}.budget`}
                rules={{
                  required: requiredMessage,
                  min: {
                    value: requiredMessage == false ? 0 : 10,
                    message: "Budget cannot be Zero",
                  },
                }}
                render={({ field, fieldState }) => (
                  <div>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className={`${fieldState.error ? "border-red-500" : ""}`}
                    />
                    {fieldState.error && (
                      <p className="text-red-500 text-sm mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          {/* Deadline and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-1" htmlFor={`phases.${index}.deadline`}>
                Deadline{" "}
                {requiredMessage !== false && <p className="text-red-500">*</p>}
              </Label>
              <Controller
                control={control}
                name={`phases.${index}.deadline`}
                rules={{ required: requiredMessage }}
                render={({ field, fieldState }) => (
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={`w-full justify-start text-left font-normal ${
                            fieldState.error ? "border-red-500" : ""
                          }`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(field.value, "PPP")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {fieldState.error && (
                      <p className="text-red-500 text-sm mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            <div>
              <Label className="mb-1" htmlFor={`phases.${index}.status`}>
                Status
              </Label>
              <Controller
                control={control}
                name={`phases.${index}.status`}
                render={({ field }) => (
                  <select
                    {...field}
                    id={`phases.${index}.status`}
                    className="block w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-md shadow-xs focus:outline-none focus:ring-3 focus:ring-gray-300 focus:border-gray-400 appearance-none transition duration-300 ease-in-out"
                    value={field.value}
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                )}
              />
            </div>
          </div>

          {/* Members Multi-Select */}
          <CMultiSelect
            name={`phases.${index}.members`}
            options={[{ id: 131231, name: "2131" }]}
          />
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() =>
          append({
            name: "" as TPhase,
            budget: 0,
            members: [],
            deadline: "",
            status: "INACTIVE" as IPhaseStatus,
          })
        }
        className="mb-4"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Phase
      </Button>
    </div>
  );
}
