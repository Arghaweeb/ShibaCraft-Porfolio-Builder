"use server";

import supabase from "@/config/supabase-db-config";
import { revalidatePath } from "next/cache";

export const addNewEducation = async (payload: any) => {
  try {
    const { data, error } = await supabase.from("educations").insert(payload);
    if (error) throw new Error(error.message);
    return {
      success: true,
      data,
      message: "Education added successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const editEducationById = async (id: string, payload: any) => {
  try {
    const { data, error } = await supabase
      .from("educations")
      .update(payload)
      .match({ id });
    if (error) throw new Error(error.message);
    return {
      success: true,
      message: "Education updated successfully",
      data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const geteducationsByUserId = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("educations")
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

export const getEducationById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("educations")
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

export const deleteEducationById = async (id: string) => {
  try {
    const { error } = await supabase.from("educations").delete().match({ id });
    if (error) throw new Error(error.message);
    revalidatePath("/account/educations");
    return {
      success: true,
      message: "Education deleted successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};