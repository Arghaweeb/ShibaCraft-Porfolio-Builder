import { getProjectsByUserId } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import { IProject } from "@/interfaces";
import Link from "next/link";
import React from "react";

interface ProjectsPageProps {
  params: {
    id: string;
  };
}

async function ProjectsPage({ params }: ProjectsPageProps) {
  const { id } = await params;
  const projectsResponse: any = await getProjectsByUserId(id);
  if (!projectsResponse.success) {
    return <div>Error: {projectsResponse.message}</div>;
  }

  const projects: IProject[] = projectsResponse.data;
  return (
    <div>
      <h1 className="my-7 text-2xl font-bold text-primary">Projects</h1>

      <div className="flex flex-col gap-7">
        {projects.map((project) => (
          <div
            key={project.id}
            className="grid grid-cols-3 p-5 border border-gray-300 rounded-lg gap-5 hover:border-primary"
          >
            <div>
              <img
                src={project.image}
                alt={project.name}
                className="w-60 h-40 object-cover rounded-lg"
              />
            </div>

            <div className="col-span-2 flex flex-col gap-3">
              <h1 className="text-sm font-bold">{project.name}</h1>
              <p className="text-gray-600 text-sm">{project.description}</p>
              <div className="flex flex-wrap gap-5">
                {project.tech_stack.split(",").map((tech) => (
                  <div
                    className="bg-gray-200 text-primary rounded-2xl p-2 text-xs"
                    key={tech}
                  >
                    {tech}
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-5">
                <Button variant={"outline"}>
                  <Link href={project.demo_link}>Demo</Link>
                </Button>
                <Button>
                  <Link href={project.repo_link}>Repo</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsPage;