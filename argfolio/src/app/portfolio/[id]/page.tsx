import { getSkillById, getSkillsByUserId } from "@/actions/skills";
import { getUserProfileById } from "@/actions/users";
import { Button } from "@/components/ui/button";
import { ISkill, IUser } from "@/interfaces";
import React from "react";

interface PortfolioHomepageProps {
  params: {
    id: string;
  };
}

async function PortfolioHomepage({ params }: PortfolioHomepageProps) {
  const { id } = await params;
  const userProfileResponse = await getUserProfileById(id);
  if (!userProfileResponse.success) {
    return <div>Error: {userProfileResponse.error}</div>;
  }
  const user: IUser = userProfileResponse.data;

  const sillsResponse: any = await getSkillsByUserId(id);
  let skills: ISkill[] = [];
  if (sillsResponse.success) {
    skills = sillsResponse.data;
  }
  return (
    <div>
      {/* intro or hero section */}
      <div className="grid grid-cols-2 gap-10 mt-20 items-center">
        <div className="col-span-1 flex flex-col gap-3">
          <h1 className="text-xl font-bold text-gray-500">Hi 👋 , I am</h1>
          <h1 className="text-4xl font-bold uppercase text-primary">
            {user.name}
          </h1>
          <p className="text-sm text-gray-600">{user.tag_line}</p>
          <div className="flex gap-5">
            <Button variant={"outline"}>Contact / Hire Me</Button>
            <Button>Download Resume</Button>
          </div>
        </div>
        <div className="col-span-1 flex justify-end">
          <img
            src={user.hero_image}
            alt={user.name}
            className="h-80 object-contain"
          />
        </div>
      </div>

      <hr className="my-20" />

      {/* bio / about section */}

      <div>
        <h1 className="text-2xl font-bold text-primart">
          Let me introduce myself ...
        </h1>
        <p
          dangerouslySetInnerHTML={{ __html: user.bio }}
          className="text-gray-600 text-sm mt-7"
        ></p>
      </div>

      <hr className="my-20" />

      {/* skills section */}
      <div>
        <h1 className="text-2xl font-bold text-primart">
          Skills and Technologies
        </h1>

        <div className="flex mt-7 flex-wrap gap-5">
          {skills.map((skill) => (
            <div className="border border-gray-300 rounded p-5 flex flex-col items-center gap-4 w-40"
            key={skill.id}
            >
              <img src={skill.image} alt={skill.name} className="h-10 w-10" />
              <p className="text-sm">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PortfolioHomepage;