import React from "react";
import ProjectForm from "../../_components/project-form";
// import ProjectForm from "../../_components/project-form";
// import { getProjectById } from "@/actions/projects";

interface IEditProjectPageProps {
  params: {
    id: string;
  };
}

async function EditProjectPage({ params }: IEditProjectPageProps) {
  const { id } = await params;
  //   const projectResponse = await getProjectById(id);
  //   if (!projectResponse.success) {
  //     return <div>Failed to load project data</div>;
  //   }

  return (
    <div>
      <h1 className="text-xl font-bold">Edit Project</h1>
      <ProjectForm formType="edit" />
    </div>
  );
}

export default EditProjectPage;
