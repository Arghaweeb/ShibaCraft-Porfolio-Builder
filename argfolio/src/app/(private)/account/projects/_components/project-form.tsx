"use client";
import React, { useMemo } from "react";
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
import { uploadFileAndGetUrl } from "@/helpers/uploads";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
// import { addNewProject, editProjectById } from "@/actions/projects";
import usersGlobalStore, {
  IUsersGlobalStore,
} from "@/global-store/users-store";
import { addNewProject, editProjectById } from "@/actions/projects";

interface IProjectFormProps {
  formType?: "add" | "edit";
  initialValues?: any;
}

function ProjectForm({
  formType = "add",
  initialValues = {},
}: IProjectFormProps) {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);
  const { user } = usersGlobalStore() as IUsersGlobalStore;

  const formSchema = z.object({
    name: z.string().nonempty().min(3).max(50),
    description: z.string().nonempty(),
    demo_link: z.string().nonempty(),
    repo_link: z.string().nonempty(),
    tech_stack: z.string().nonempty(),
    image: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValues?.name || "",
      description: initialValues?.description || "",
      demo_link: initialValues?.demo_link || "",
      repo_link: initialValues?.repo_link || "",
      tech_stack: initialValues?.tech_stack || "",
      image: initialValues?.image || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const payload: any = { ...values };
      if (selectedFile) {
        payload.image = await uploadFileAndGetUrl(selectedFile);
      }

      payload.user_id = user?.id;
      let response: any = null;
      if (formType === "add") {
        response = await addNewProject(payload);
      } else {
        response = await editProjectById(initialValues.id, payload);
      }

      if (response.success) {
        toast.success(response.message);
        router.push("/account/projects");
      } else {
        toast.error(response.error);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const projectImagePreview = useMemo(() => {
    if (selectedFile) {
      return URL.createObjectURL(selectedFile);
    }

    return initialValues?.image || "";
  }, [selectedFile]);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-7">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your project description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tech_stack"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tech stack</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the tech stack used in the project (React, Node, Express, MongoDB)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="demo_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Demo Link</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter demo link" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="repo_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repo Link</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter repo link" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => {
                      setSelectedFile(e.target.files![0]);
                    }}
                    className="w-max"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {projectImagePreview && (
            <div className="p-2 border rounded w-max">
              <img
                src={projectImagePreview}
                alt="hero image"
                className="w-32 h-32 rounded"
              />
            </div>
          )}

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

export default ProjectForm;