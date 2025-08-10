import { getExperiencesByUserId } from "@/actions/experiences";
import { IExperience } from "@/interfaces";
import dayjs from "dayjs";
import React from "react";

interface ExperiencesPageProps {
  params: {
    id: string;
  };
}

async function ExperiencesPage({ params }: ExperiencesPageProps) {
  const { id } = await params;
  const response: any = await getExperiencesByUserId(id);
  if (!response.success) {
    return <div>Failed to fetch experiences</div>;
  }

  const experiences: IExperience[] = response.data;
  const sortedData = experiences.sort((a, b) => {
    return dayjs(b.start_date).unix() - dayjs(a.start_date).unix();
  });

  return (
    <div>
      <h1 className="my-7 text-2xl text-primary font-bold">Work Experiences</h1>

      {sortedData.map((experience) => (
        <div key={experience.id} className="flex gap-10">
          <div className="flex flex-col items-center">
            <div className="h-4 w-4 rounded-full bg-primary"></div>
            <div className="w-1 h-full bg-gray-300"></div>
          </div>

          <div className="flex flex-col gap-2 py-7">
            <h1 className="text-sm font-bold text-primary">
              {experience.role} at {experience.company}
            </h1>
            <h1 className="text-gray-500 font-bold">
              {dayjs(experience.start_date).format("MMM YYYY")} -{" "}
              {experience.end_date
                ? dayjs(experience.end_date).format("MMM YYYY")
                : "Present"}
            </h1>
            <p className="text-gray-600 text-sm">{experience.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExperiencesPage;