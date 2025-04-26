/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import CButton from "@/components/ui_components/form/CButton";
import CForm from "@/components/ui_components/form/CForm";
import CInput from "@/components/ui_components/form/CInput";
import { CInputArray } from "@/components/ui_components/form/CInputArray";
import CMultiSelect from "@/components/ui_components/form/CMultiSelect";
import CSelect from "@/components/ui_components/form/CSelect";
import CTextArea from "@/components/ui_components/form/CTextArea";
import { useAddProjectMutation } from "@/Redux/api/projectApi/projectApi";
import React from "react";

const AddProject = () => {
  const [addProject] = useAddProjectMutation();
  const onSubmit = async (data: any) => {
    console.log(data);
    //await addProject()
  };

  return (
    <div className="px-2  ">
      <h1 className="my-2 text-xl font-bold text-center">Add New Project</h1>

      <div className="mb-3">
        <CForm onSubmit={onSubmit}>
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
          <CInput
            label="Google Sheet"
            name="googleSheetLink"
            placeholder="Google Sheet Link"
          ></CInput>
          <div className=" flex ">
            <CSelect
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
          <CTextArea
            validation={{ required: "This field is required" }}
            label="Description"
            name="description"
            placeholder="Project description"
          ></CTextArea>

          <CInput
            validation={{ required: "This field is required" }}
            label="Sales Name"
            name="salesName"
            placeholder="Salse name"
          ></CInput>
          <CSelect
            options={[
              { label: "COMPLETED", value: "COMPLETED" },
              { label: "ONGOING", value: "ONGOING" },
              { label: "CENCELED", value: "CENCELED" },
            ]}
            name="status"
            label="Status"
            defaultValue="ONGOING"
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
