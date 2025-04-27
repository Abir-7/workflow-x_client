/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CButton from "@/components/ui_components/form/CButton";
import CForm from "@/components/ui_components/form/CForm";
import CInput from "@/components/ui_components/form/CInput";
import CMultiSelect from "@/components/ui_components/form/CMultiSelect";
import CSelect from "@/components/ui_components/form/CSelect";
import { useAddTeamMutation } from "@/Redux/api/teamApi/teamApi";
import {
  useGetAllLeaderQuery,
  useGetAllUserNotInAnyTeamQuery,
} from "@/Redux/api/userApi/userApi";
import React, { useState } from "react";
import { toast } from "sonner";

const AddTeam = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: getAllUser } = useGetAllUserNotInAnyTeamQuery("");
  const { data: getAllLeader } = useGetAllLeaderQuery("");
  const [addTeam] = useAddTeamMutation();
  console.log(getAllLeader, getAllUser);

  getAllUser?.data?.map((user: any) => {
    console.log(user?.profileInfo?.fullName);
    return {
      label: user?.profileInfo?.fullName,
      value: user?._id,
    };
  });

  const onSubmit = async (formData: any) => {
    setIsSubmitting(true);
    const formDataObj = new FormData();

    if (formData.image && formData.image[0]) {
      formDataObj.append("image", formData.image[0]);
    }
    const teamData = {
      name: formData.name || "",
      leader: formData.leader || "",
      tagLine: formData.tagLine || "",
      // Convert members array to just IDs
      members: formData.members?.map((member: any) => member.id) || [],
    };

    formDataObj.append("data", JSON.stringify(teamData));

    const res = (await addTeam(formDataObj)) as any;

    if (res?.error) {
      toast.error(res.error?.data?.message || "  Failed to create team. ");
      setIsSubmitting(false);
    }
    console.log(res);

    if (res?.data?.success) {
      toast.success("successfull");
      setIsSubmitting(false);
    }
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
            placeholder="Select leader"
            validation={{ required: "This field is required" }}
            label="Leader"
            name="leader"
            options={
              getAllLeader?.data?.map((leader: any) => {
                return {
                  label: leader?.profileInfo?.fullName,
                  value: leader?._id,
                };
              }) || []
            }
          ></CSelect>

          <CMultiSelect
            required
            name="members"
            options={
              getAllUser?.data?.map((user: any) => {
                return {
                  name: user?.profileInfo?.fullName,
                  id: user?._id,
                };
              }) || [{}]
            }
          ></CMultiSelect>
          <CInput label="Tag Line" name="tagLine"></CInput>
          <CButton
            isSubmitting={isSubmitting}
            className="bg-blue-950 text-white font-semibold  w-full py-2 rounded-lg"
            label="Add Team"
          ></CButton>
        </CForm>
      </div>
    </div>
  );
};

export default AddTeam;
