export interface IUser {
  id: string;
  clerk_user_id: string;
  name: string;
  email: string;
  bio: string;
  hero_image: string;
  tag_line: string;
  title: string;
  created_at: string;
}

export interface IProject {
  id: string;
  user_id: string;
  name: string;
  description: string;
  demo_link: string;
  repo_link: string;
  image: string;
  tech_stack: string;
  created_at: string;
  updated_at: string;
}

export interface IExperience {
  id: string;
  user_id: string;
  company: string;
  role: string;
  start_date: string;
  end_date: string;
  description: string;
  location: string;
  created_at: string;
  updated_at: string;
}

// export interface ISkill {
//   id: string;
//   user_id: string;
//   name: string;
//   level: number;
//   image: string;
//   created_at: string;
//   updated_at: string;
// }


// export interface IEducation {
//   id: string;
//   user_id: string;
//   degree : string;
//   institution: string;
//   location : string;
//   start_date : string;
//   end_date : string;
//   percentage : string;
//   created_at: string;
//   updated_at: string;
// }

// export interface IQuery {
//   id : string
//   name : string;
//   email : string;
//   message : string;
//   user_id : string;
//   created_at : string;
// }