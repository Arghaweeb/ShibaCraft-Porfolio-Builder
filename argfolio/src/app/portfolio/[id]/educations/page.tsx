import { geteducationsByUserId } from "@/actions/educations";
import { IEducation, IExperience } from "@/interfaces";
import dayjs from "dayjs";
import React from "react";

interface EducationsPageProps {
  params: {
    id: string;
  };
}

async function EducationsPage({ params }: EducationsPageProps) {
  const { id } = await params;
  const response: any = await geteducationsByUserId(id);
  if (!response.success) {
    return <div>Failed to fetch educations</div>;
  }

  const educations: IEducation[] = response.data;
  const sortedData = educations.sort((a, b) => {
    return dayjs(b.start_date).unix() - dayjs(a.start_date).unix();
  });

  return (
    <div>
      <h1 className="my-7 text-2xl text-primary font-bold">
        Academics / Education
      </h1>

      {sortedData.map((education) => (
        <div key={education.id} className="flex gap-10">
          <div className="flex flex-col items-center">
            <div className="h-4 w-4 rounded-full bg-primary"></div>
            <div className="w-1 h-full bg-gray-300"></div>
          </div>

          <div className="flex flex-col gap-2 py-7">
            <h1 className="text-sm font-bold text-primary">
              {education.degree} at {education.institution} (
              {education.location})
            </h1>
            <h1 className="text-gray-500 font-bold">
              {dayjs(education.start_date).format("MMM YYYY")} -{" "}
              {education.end_date
                ? dayjs(education.end_date).format("MMM YYYY")
                : "Present"}
            </h1>
            <p className="text-gray-700">{education.percentage} %</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EducationsPage;