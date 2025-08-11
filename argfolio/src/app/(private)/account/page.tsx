import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from '@supabase/supabase-js';
import { Share2, User, Briefcase, GraduationCap, Trophy, Settings } from "lucide-react";
import PortfolioActions from "@/actions/PortfolioActions";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY!
);

// Database query function
async function getUserPortfolioData(clerkUserId: string) {
  try {
    // First, get the user profile
    const { data: userProfile, error: profileError } = await supabase
      .from('user_profiles')
      .select('id, name, email, bio, tag_line, title, hero_image')
      .eq('clerk_user_id', clerkUserId)
      .single();

    if (profileError || !userProfile) {
      console.error("Error fetching user profile:", profileError);
      return {
        hasProfile: false,
        hasSkills: false,
        hasProjects: false,
        hasExperiences: false,
        hasEducations: false,
        hasConfiguration: false,
        portfolioUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/portfolio/${clerkUserId}`,
        userNotFound: true
      };
    }

    const userId = userProfile.id;

    // Check if profile is complete (has essential fields)
    const hasProfile = !!(userProfile.name && userProfile.bio);

    // Check skills
    const { data: skills, error: skillsError } = await supabase
      .from('skills')
      .select('id')
      .eq('user_id', userId);

    const hasSkills = !skillsError && skills && skills.length > 0;

    // Check projects
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('id')
      .eq('user_id', userId);

    const hasProjects = !projectsError && projects && projects.length > 0;

    // Check experiences
    const { data: experiences, error: experiencesError } = await supabase
      .from('experiences')
      .select('id')
      .eq('user_id', userId);

    const hasExperiences = !experiencesError && experiences && experiences.length > 0;

    // Check educations
    const { data: educations, error: educationsError } = await supabase
      .from('educations')
      .select('id')
      .eq('user_id', userId);

    const hasEducations = !educationsError && educations && educations.length > 0;

    // Check configuration
    const { data: configurations, error: configError } = await supabase
      .from('configurations')
      .select('id')
      .eq('user_id', userId);

    const hasConfiguration = !configError && configurations && configurations.length > 0;

    return {
      hasProfile,
      hasSkills,
      hasProjects,
      hasExperiences,
      hasEducations,
      hasConfiguration,
      portfolioUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/portfolio/${clerkUserId}`,
      userProfile,
      userNotFound: false
    };

  } catch (error) {
    console.error("Error fetching user portfolio data:", error);
    return {
      hasProfile: false,
      hasSkills: false,
      hasProjects: false,
      hasExperiences: false,
      hasEducations: false,
      hasConfiguration: false,
      portfolioUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/portfolio/${clerkUserId}`,
      userNotFound: true
    };
  }
}

async function AccountPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect("/sign-in");
  }

  const portfolioData = await getUserPortfolioData(user.id);

  // If user doesn't exist in database, redirect to setup
  if (portfolioData.userNotFound) {
    // You might want to create a setup page or redirect to profile creation
    redirect("/account/profile");
  }
  
  const portfolioSections = [
    {
      name: "Profile",
      completed: portfolioData.hasProfile,
      icon: User,
      description: "Basic information and bio",
      href: "/account/profile"
    },
    {
      name: "Skills",
      completed: portfolioData.hasSkills,
      icon: Trophy,
      description: "Technical and soft skills",
      href: "/account/skills"
    },
    {
      name: "Projects",
      completed: portfolioData.hasProjects,
      icon: Briefcase,
      description: "Your work and projects",
      href: "/account/projects"
    },
    {
      name: "Experiences",
      completed: portfolioData.hasExperiences,
      icon: Briefcase,
      description: "Work experience and roles",
      href: "/account/experiences"
    },
    {
      name: "Education",
      completed: portfolioData.hasEducations,
      icon: GraduationCap,
      description: "Educational background",
      href: "/account/educations"
    },
    {
      name: "Configuration",
      completed: portfolioData.hasConfiguration,
      icon: Settings,
      description: "Portfolio display settings",
      href: "/account/configuration"
    },
  ];

  const completedSections = portfolioSections.filter(section => section.completed).length;
  const totalSections = portfolioSections.length;
  const isPortfolioComplete = completedSections === totalSections;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back{portfolioData.userProfile?.name ? `, ${portfolioData.userProfile.name}` : user.firstName ? `, ${user.firstName}` : ''}!
        </h1>
        <p className="text-gray-600">Manage your portfolio and track your progress</p>
      </div>

      {/* Portfolio Status Card */}
      <div className="bg-white rounded-lg shadow-md border mb-8">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Portfolio Status
          </h2>
        </div>
        <div className="p-6">
          {isPortfolioComplete ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-600">
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                <span className="font-semibold">Congratulations! Your portfolio URL is ready. Share it with your friends.</span>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <code className="text-sm text-green-800 bg-green-100 px-3 py-1 rounded flex-1 min-w-0 break-all">
                    {portfolioData.portfolioUrl}
                  </code>
                  <PortfolioActions portfolioUrl={portfolioData.portfolioUrl} />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Tips to get more views:</h4>
                <ul className="space-y-1 text-sm text-gray-600 ml-4">
                  <li>• Write a good bio about yourself.</li>
                  <li>• Add your skills and experience. Add icons/images to make it more attractive.</li>
                  <li>• Add your projects. Add images and description.</li>
                  <li>• Add your past experiences to make it more professional.</li>
                  <li>• Share your portfolio on social media.</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-orange-600">
                <div className="h-3 w-3 bg-orange-500 rounded-full"></div>
                <span className="font-semibold">No portfolio yet - Complete all sections to generate your portfolio URL</span>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-800 font-medium">Portfolio Completion</p>
                    <p className="text-orange-600 text-sm">{completedSections} of {totalSections} sections completed</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-orange-800">{Math.round((completedSections / totalSections) * 100)}%</div>
                  </div>
                </div>
                <div className="mt-3 w-full bg-orange-200 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${(completedSections / totalSections) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Portfolio Sections */}
      <div className="bg-white rounded-lg shadow-md border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Portfolio Sections</h2>
          <p className="text-sm text-gray-600 mt-1">Complete all sections to generate your portfolio</p>
        </div>
        <div className="p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {portfolioSections.map((section) => {
              const IconComponent = section.icon;
              return (
                <div
                  key={section.name}
                  className={`border rounded-lg p-4 transition-colors ${
                    section.completed 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-5 w-5" />
                      <span className="font-semibold">{section.name}</span>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      section.completed 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {section.completed ? "Complete" : "Pending"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{section.description}</p>
                  <Link
                    href={section.href}
                    className={`block w-full text-center px-3 py-2 text-sm rounded transition-colors ${
                      section.completed
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {section.completed ? `Edit ${section.name}` : `Complete ${section.name}`}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{portfolioData.hasSkills ? '✓' : '0'}</div>
          <div className="text-sm text-blue-800">Skills Added</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{portfolioData.hasProjects ? '✓' : '0'}</div>
          <div className="text-sm text-green-800">Projects</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{portfolioData.hasExperiences ? '✓' : '0'}</div>
          <div className="text-sm text-purple-800">Experiences</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">{portfolioData.hasEducations ? '✓' : '0'}</div>
          <div className="text-sm text-yellow-800">Education</div>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;