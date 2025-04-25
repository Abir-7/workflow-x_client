/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CButton from "@/components/ui_components/form/CButton";
import CForm from "@/components/ui_components/form/CForm";
import CInput from "@/components/ui_components/form/CInput";
import CMultiSelect from "@/components/ui_components/form/CMultiSelect";
import CSelect from "@/components/ui_components/form/CSelect";
import React from "react";

const page = () => {
  const onSubmit = async (data: any) => {
    console.log(data);
  };
  return (
    <div className="px-2  ">
      <h1 className="my-2 text-xl font-bold text-center">Add New Team </h1>
      <div>
        <CForm onSubmit={onSubmit}>
          <CInput
            label="Team Name"
            name="name"
            validation={{ required: "This field is required" }}
          ></CInput>
          <CInput name="image" label="Profile Photo" type="file"></CInput>
          <CSelect
            validation={{ required: "This field is required" }}
            label="Leader"
            name="leader"
            options={[]}
          ></CSelect>

          <CMultiSelect
            required
            name="members"
            options={[{ id: 123, name: "as" }]}
          ></CMultiSelect>
          <CInput label="Tag Line" name="tagLine"></CInput>
          <CButton
            className="bg-blue-950 text-white font-semibold  w-full py-2 rounded-lg"
            label="Add Team"
          ></CButton>
        </CForm>
      </div>
    </div>
  );
};

export default page;
