"use server";

import supabase from "@/config/supabase-db-config";
import { revalidatePath } from "next/cache";

export const addNewExperience = async (payload: any) => {
  try {
    const { data, error } = await supabase.from("experiences").insert(payload);
    if (error) throw new Error(error.message);
    return {
      success: true,
      data,
      message: "Experience added successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const editExperienceById = async (id: string, payload: any) => {
  try {
    const { data, error } = await supabase
      .from("experiences")
      .update(payload)
      .match({ id });
    if (error) throw new Error(error.message);
    return {
      success: true,
      message: "Experience updated successfully",
      data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getExperiencesByUserId = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return {
      success: true,
      data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getExperienceById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw new Error(error.message);
    return {
      success: true,
      data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const deleteExperienceById = async (id: string) => {
  try {
    const { error } = await supabase.from("experiences").delete().match({ id });
    if (error) throw new Error(error.message);
    revalidatePath("/account/experiences");
    return {
      success: true,
      message: "Experience deleted successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};