"use server";

import supabase from "@/config/supabase-db-config";
import { currentUser } from "@clerk/nextjs/server";

export const saveCurrentUser = async (userData: any) => {
  try {
    const { data, error } = await supabase
      .from("user_profiles")
      .insert([userData]);
    if (error) {
      throw new Error("Error saving user data");
    }
    return {
      success: true,
      data: data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const getCurrentUser = async () => {
  try {
    const clerkUser = await currentUser();

    const { data, error } = await supabase
      .from("user_profiles")
      .select("")
      .eq("clerk_user_id", clerkUser?.id);

    if (error) {
      throw new Error("Error fetching user data");
    }

    const user = data.length > 0 ? data[0] : null;
    // if user is found, return the user data
    if (user) {
      return {
        success: true,
        data: user,
      };
    }

    // else create a new user , save it to the database and return the user data

    const userData = {
      name: clerkUser?.firstName + " " + clerkUser?.lastName,
      email: clerkUser?.emailAddresses[0].emailAddress,
      clerk_user_id: clerkUser?.id,
    };

    const response = await saveCurrentUser(userData);
    if (response.success) {
      return {
        success: true,
        data: response.data,
      };
    }

    throw new Error("Error saving user data");
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const updateCurrentUser = async (userData: any) => {
  try {
    const { error, data } = await supabase
      .from("user_profiles")
      .update(userData)
      .eq("id", userData.id);

    if (error) {
      throw new Error("Error updating user data");
    }

    return {
      success: true,
      data: data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

// export const getUserProfileById = async (id: string) => {
//   try {
//     const { data, error } = await supabase
//       .from("user_profiles")
//       .select()
//       .eq("id", id);
//     if (error) {
//       throw new Error("Error fetching user data");
//     }
//     return {
//       success: true,
//       data: data[0],
//     };
//   } catch (error: any) {
//     return {
//       success: false,
//       error: error.message,
//     };
//   }
// };