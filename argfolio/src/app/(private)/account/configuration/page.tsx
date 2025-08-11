"use client";
import React, { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import usersGlobalStore, {
  IUsersGlobalStore,
} from "@/global-store/users-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { getConfiguration, saveConfiguration } from "@/actions/configuration";
import toast from "react-hot-toast";

function ConfigurationPage() {
  const { user } = usersGlobalStore() as IUsersGlobalStore;
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const [initialValues, setInitialValues] = React.useState<any>({
    show_educations: true,
    show_percentage_in_educations: true,
    show_icons_in_skills: true,
    show_levels_in_skills: true,
  });
  const formSchema = z.object({
    show_educations: z.boolean(),
    show_percentage_in_educations: z.boolean(),
    show_icons_in_skills: z.boolean(),
    show_levels_in_skills: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const response = await saveConfiguration({
        userId: user?.id!,
        payload: {
          ...data,
          user_id: user?.id,
        },
      });
      if (response.success) {
        toast.success(response.message);
        router.push("/account");
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchConfiguration = async () => {
    try {
      setLoading(true);
      const response = await getConfiguration(user?.id!);
      if (response.success) {
        setInitialValues(response.data);
        form.reset(response.data);
      } 
    } catch (error:any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchConfiguration();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Configuration</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-7">
          <FormField
            control={form.control}
            name="show_educations"
            render={({ field }) => (
              <FormItem className="flex items-center gap-5">
                <FormLabel>Show Educations</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="show_percentage_in_educations"
            render={({ field }) => (
              <FormItem className="flex items-center gap-5">
                <FormLabel>Show Percentage in Educations</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="show_icons_in_skills"
            render={({ field }) => (
              <FormItem className="flex items-center gap-5">
                <FormLabel>Show Icons in Skills</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="show_levels_in_skills"
            render={({ field }) => (
              <FormItem className="flex items-center gap-5">
                <FormLabel>Show Levels in Skills</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

export default ConfigurationPage;