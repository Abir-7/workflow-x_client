"use client";
import CButton from "@/components/ui_components/form/CButton";
import CForm from "@/components/ui_components/form/CForm";
import CInput from "@/components/ui_components/form/CInput";
import { CInputArray } from "@/components/ui_components/form/CInputArray";
import CMultiSelect from "@/components/ui_components/form/CMultiSelect";
import CSelect from "@/components/ui_components/form/CSelect";
import React from "react";

const AddProject = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    console.log(data, "dd");
  };
  return (
    <div className="px-2  ">
      <h1 className="my-2 text-xl font-bold text-center">Add New Project</h1>

      <div className="mb-3">
        <CForm
          defaultValues={{
            name: "Project X", // Default project name
            clientName: "Client Y", // Default client name
            projectGroup: "https://example.com", // Default project group link
            teamId: "2131223", // Default team selection (Team 1)
            mebmers: [{ id: 1, name: "Audi" }], // Default members
            totalBudget: 100000, // Default budget
            duration: 12, // Default duration in months
            description: "This is a sample project description", // Default description
            salesName: "John Doe", // Default sales name
            status: "2131223", // Default status (Team 1)
            phases: [
              {
                // Default phase
                name: "Planning",
                budget: 10000,
                members: [{ id: 1, name: "Audi" }],
                deadline: new Date(),
                status: "Not Started",
              },
              {
                // Default phase
                name: "Planning",
                budget: 10000,
                members: [{ id: 1, name: "Audi" }],
                deadline: new Date(),
                status: "Not Started",
              },
            ],
          }}
          onSubmit={onSubmit}
        >
          <CInput
            validation={{ required: "This field is required" }}
            label="Project Name"
            name="name"
            placeholder="Project Name"
          ></CInput>
          <CInput
            validation={{ required: "This field is required" }}
            label="Client Name"
            name="clientName"
            placeholder="Client Name"
          ></CInput>
          <CInput
            label="Project Group"
            name="projectGroup"
            placeholder="Project Group Link"
          ></CInput>
          <div className=" flex ">
            <CSelect
              validation={{ required: "This field is required" }}
              options={[
                { label: "Team 1", value: "2131223" },
                { label: "Team 2", value: "213123" },
              ]}
              name="teamId"
              label="Team"
              placeholder={"Select-team"}
            ></CSelect>
          </div>
          <CMultiSelect
            name="mebmers"
            options={[
              { id: 1, name: "Audi" },
              { id: 2, name: "BMW" },
              { id: 3, name: "Chevrolet" },
              { id: 4, name: "Ford" },
              { id: 5, name: "Honda" },
            ]}
          ></CMultiSelect>
          <CInputArray></CInputArray>
          <CInput
            validation={{ required: "This field is required" }}
            label="Total Budget"
            name="totalBudget"
            placeholder="Amount"
          ></CInput>
          <CInput
            validation={{ required: "This field is required" }}
            label="Duration"
            name="duration"
            placeholder="In month"
          ></CInput>
          <CInput
            label="Description"
            name="description"
            placeholder="Project description"
          ></CInput>

          <CInput
            validation={{ required: "This field is required" }}
            label="Sales Name"
            name="salesName"
            placeholder="Salse name"
          ></CInput>
          <CSelect
            options={[
              { label: "Team 1", value: "2131223" },
              { label: "Team 2", value: "213123" },
            ]}
            name="status"
            label="Status"
            placeholder={"Set-Status"}
          ></CSelect>
          <CButton
            className="bg-blue-950 text-white font-semibold  w-full py-2 rounded-lg"
            label="Add Project"
          ></CButton>
        </CForm>
      </div>
    </div>
  );
};

export default AddProject;
