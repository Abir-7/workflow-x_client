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

type TPhase = "Planning" | "Development" | "Testing" | "Deployment"; // Add your phase types
type IPhaseStatus = "Not Started" | "In Progress" | "Completed" | "Delayed"; // Add your status types

export function CInputArray() {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "phases",
  });

  // Add a default phase if none exists
  if (fields.length === 0) {
    append({
      name: "" as TPhase,
      budget: 0,
      members: [], // Initialize members as an empty array
      deadline: new Date(),
      status: "Not Started" as IPhaseStatus,
    });
  }

  return (
    <div className="space-y-4 mt-4">
      <Label>Project Phases</Label>

      {fields.map((field, index) => (
        <div key={field.id} className="border p-4 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <Label>Phase {index + 1}</Label>
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

          {/* Phase Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-1" htmlFor={`phases.${index}.name`}>
                Phase Name
              </Label>
              <Controller
                control={control}
                name={`phases.${index}.name`}
                render={({ field }) => (
                  <select
                    {...field}
                    id={`phases.${index}.name`}
                    className={`block w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-md shadow-xs focus:outline-none focus:ring-3 focus:ring-gray-300 focus:border-gray-400  appearance-none transition duration-300 ease-in-out`}
                    value={field.value || ""}
                  >
                    <option value="" disabled className="text-gray-200">
                      Select Phase Name
                    </option>
                    <option value="Planning">Planning</option>
                    <option value="Development">Development</option>
                    <option value="Testing">Testing</option>
                    <option value="Deployment">Deployment</option>
                  </select>
                )}
              />
            </div>

            {/* Budget */}
            <div>
              <Label className="mb-1" htmlFor={`phases.${index}.budget`}>
                Budget ($)
              </Label>
              <Controller
                control={control}
                name={`phases.${index}.budget`}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    min="0"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
            </div>
          </div>

          {/* Deadline and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-1" htmlFor={`phases.${index}.deadline`}>
                Deadline
              </Label>
              <Controller
                control={control}
                name={`phases.${index}.deadline`}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
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
                    className={`block w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-md shadow-xs focus:outline-none focus:ring-3 focus:ring-gray-300 focus:border-gray-400  appearance-none transition duration-300 ease-in-out`}
                    value={field.value}
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Delayed">Delayed</option>
                  </select>
                )}
              />
            </div>
          </div>

          {/* Members (Multi-Select with display of number of selected members) */}
          <div>
            <CMultiSelect
              name={`phases.${index}.members`}
              options={[{ id: 131231, name: "2131" }]}
            />
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() =>
          append({
            name: "Development" as TPhase,
            budget: 0,
            members: [], // Initial members as an empty array
            deadline: new Date(),
            status: "Not Started" as IPhaseStatus,
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
