import { getExperiencesByUserId } from "@/actions/experiences";
import { getCurrentUser } from "@/actions/users";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import ExperiencesTable from "./components/experience-table";

async function ExperinencesPage() {
  const userResponse: any = await getCurrentUser();
  if (!userResponse.success) {
    return <div>Failed to load user data</div>;
  }

  const experiencesResponse = await getExperiencesByUserId(
    userResponse?.data?.id!
  );
  if (!experiencesResponse.success) {
    return <div>Failed to load experiences</div>;
  }

  const experiences: any = experiencesResponse.data;
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Experiences</h1>
        <Button>
          <Link href="/account/experiences/add">Add Experience</Link>
        </Button>
      </div>

      <ExperiencesTable experiences={experiences} />
    </div>
  );
}

export default ExperinencesPage;