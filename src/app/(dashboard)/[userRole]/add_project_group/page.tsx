/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CButton from "@/components/ui_components/form/CButton";
import CForm from "@/components/ui_components/form/CForm";
import CInput from "@/components/ui_components/form/CInput";
import React from "react";

const ProjectGroup = () => {
  const onSubmit = async (data: any) => {
    console.log(data);
  };
  return (
    <div className="px-2  ">
      <h1 className="my-2 text-xl font-bold text-center">
        Add New Project Group
      </h1>
      <div>
        <CForm onSubmit={onSubmit}>
          <CInput
            validation={{ required: "This field is required" }}
            label="Group Name"
            name="name"
          ></CInput>
          <CInput
            validation={{ required: "This field is required" }}
            label="Project Id"
            name="projectId"
          ></CInput>
          <CInput
            validation={{ required: "This field is required" }}
            label="Group Link"
            name="link"
          ></CInput>

          <CButton
            className="bg-blue-950 text-white font-semibold  w-full py-2 rounded-lg"
            label="Add Group"
          ></CButton>
        </CForm>
      </div>
    </div>
  );
};

export default ProjectGroup;
