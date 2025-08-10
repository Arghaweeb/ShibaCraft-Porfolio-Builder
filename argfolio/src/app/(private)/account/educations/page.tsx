import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import EducationsTable from "./_components/educations-table";
import { getCurrentUser } from "@/actions/users";
import { geteducationsByUserId } from "@/actions/educations";

async function EducationsPage() {
  const userResponse: any = await getCurrentUser();
  if (!userResponse.success) {
    return <div>Failed to load user data</div>;
  }

  const educationsResponse = await geteducationsByUserId(
    userResponse?.data?.id!
  );
  if (!educationsResponse.success) {
    return <div>Failed to load educations</div>;
  }

  const educations: any = educationsResponse.data;
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Educations</h1>
        <Button>
          <Link href="/account/educations/add">Add education</Link>
        </Button>
      </div>

      <EducationsTable educations={educations} />
    </div>
  );
}

export default EducationsPage;