import { getCurrentUser } from "@/actions/users";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import React from "react";

async function ProjectsPage() {
  const userResponse: any = await getCurrentUser();
  if (!userResponse.success) {
    return <div>Failed to load user data</div>;
  }

//   const projectsResponse = await getProjectsbyUserId(userResponse?.data?.id!);
//   if (!projectsResponse.success) {
//     return <div>Failed to load projects</div>;
//   }

//   const projects:any = projectsResponse.data;
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Projects</h1>
        <Button>
          <Link href="/account/projects/add">Add Project</Link>
        </Button>
      </div>

      {/* <ProjectsTable projects={projects} /> */}
    </div>
  );
}

export default ProjectsPage;