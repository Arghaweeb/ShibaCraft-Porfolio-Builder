"use server";

import supabase from "@/config/supabase-db-config";
import { revalidatePath } from "next/cache";

export const addNewSkill = async (payload: any) => {
  try {
    const { data, error } = await supabase.from("skills").insert(payload);
    if (error) throw new Error(error.message);
    return {
      success: true,
      data,
      message: "Skill added successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const editSkillById = async (id: string, payload: any) => {
  try {
    const { data, error } = await supabase
      .from("skills")
      .update(payload)
      .match({ id });
    if (error) throw new Error(error.message);
    return {
      success: true,
      message: "Skill updated successfully",
      data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getSkillsByUserId = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("skills")
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

export const getSkillById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("skills")
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

export const deleteSkillById = async (id: string) => {
  try {
    const { error } = await supabase.from("skills").delete().match({ id });
    if (error) throw new Error(error.message);
    revalidatePath("/account/skills");
    return {
      success: true,
      message: "Skill deleted successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};