import { getExperienceById } from "@/actions/experiences";
import React from "react";
import ExperienceForm from "../../components/experience-form";


interface IEditExperienceProps {
  params: {
    id: string;
  };
}

async function EditExperience({ params }: IEditExperienceProps) {
  const { id } = await params;
  const experienceResponse = await getExperienceById(id);
  if (!experienceResponse.success) {
    return <div>{experienceResponse.message}</div>;
  }
  return (
    <div>
      <h1 className="text-xl font-bold">Experiences</h1>
      <ExperienceForm initialValues={experienceResponse.data} formType="edit" />
    </div>
  );
}

export default EditExperience;