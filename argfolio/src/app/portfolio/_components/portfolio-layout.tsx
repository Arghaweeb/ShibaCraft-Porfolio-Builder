"use client";
import { getConfiguration } from "@/actions/configuration";
import Spinner from "@/components/ui/spinner";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

function PortfolioLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = React.useState(false);
  const [config, setConfig] = React.useState({
    show_educations: true,
    show_percentage_in_educations: true,
    show_icons_in_skills: true,
    show_levels_in_skills: true,
  });
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const userId: any = params?.id;

  const fetchConfiguration = async () => {
    try {
      setLoading(true);
      const response = await getConfiguration(userId);
      if (response.success && response.data) {
        setConfig(response.data);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfiguration();
  }, []);

  let menuItems = [
    {
      name: "Home",
      path: `/portfolio/${params.id}`,
    },
    {
      name: "Education",
      path: `/portfolio/${params.id}/educations`,
    },
    {
      name: "Experience",
      path: `/portfolio/${params.id}/experiences`,
    },
    {
      name: "Projects",
      path: `/portfolio/${params.id}/projects`,
    },
    {
      name: "Contact",
      path: `/portfolio/${params.id}/contactus`,
    },
  ];
  if (config.show_educations === false) {
    menuItems = menuItems.filter((item) => item.name !== "Education");
  }

  // if in the user config education is disabled, remove the education menu item

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="lg:px-24 px-5">
      <div className="bg-primary text-white flex items-center justify-center p-5 gap-7 rounded-b-2xl">
        {menuItems.map((item, index) => (
          <div
            className={`p-3 cursor-pointer text-sm ${
              pathname === item.path ? "bg-gray-300 rounded text-primary" : ""
            }`}
            onClick={() => {
              router.push(item.path);
            }}
            key={index}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

export default PortfolioLayout;