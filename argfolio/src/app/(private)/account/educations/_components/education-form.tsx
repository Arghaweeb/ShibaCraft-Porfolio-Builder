"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import usersGlobalStore, {
  IUsersGlobalStore,
} from "@/global-store/users-store";
import { addNewExperience, editExperienceById } from "@/actions/experiences";
import { addNewEducation, editEducationById } from "@/actions/educations";

interface EducationFormProps {
  initialValues?: any;
  formType?: "add" | "edit";
}

function EducationForm({
  formType = "add",
  initialValues,
}: EducationFormProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const { user } = usersGlobalStore() as IUsersGlobalStore;

  const formSchema = z.object({
    degree: z.string().nonempty().min(3).max(50),
    institution: z.string().nonempty().min(3).max(50),
    start_date: z.string().nonempty(),
    end_date: z.string().nonempty(),
    location: z.string().nonempty(),
    percentage: z.number()
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      degree: initialValues?.degree || "",
      institution: initialValues?.institution || "",
      start_date: initialValues?.start_date || "",
      end_date: initialValues?.end_date || "",
      location: initialValues?.location || "",
      percentage: initialValues?.percentage || 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const payload: any = { ...values };

      payload.user_id = user?.id;
      let response: any = null;
      if (formType === "add") {
        response = await addNewEducation(payload);
      } else {
        response = await editEducationById(initialValues.id, payload);
      }

      if (response.success) {
        toast.success(response.message);
        router.push("/account/educations");
      } else {
        toast.error(response.error);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-7">
          <div className="grid grid-cols-3 gap-5">
            {" "}
            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Degree</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="percentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Percentage</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      onChange={(e:any) => {
                        form.setValue("percentage", Number(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end gap-5">
            <Button
              disabled={loading}
              variant="secondary"
              onClick={() => router.back()}
              type="button"
            >
              Cancel
            </Button>
            <Button disabled={loading} type="submit">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default EducationForm;