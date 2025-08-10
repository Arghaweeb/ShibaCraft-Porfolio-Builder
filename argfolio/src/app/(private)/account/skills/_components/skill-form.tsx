import React, { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { addNewProject, editProjectById } from "@/actions/projects";
import usersGlobalStore, {
  IUsersGlobalStore,
} from "@/global-store/users-store";
import { addNewSkill, editSkillById } from "@/actions/skills";
interface SkillFormProps {
  formType: "add" | "edit";
  initialValues?: any;
  openSkillForm: boolean;
  setOpenSkillForm: (open: boolean) => void;
  reloadData: () => void;
}

function SkillForm({
  formType,
  initialValues,
  openSkillForm,
  setOpenSkillForm,
  reloadData,
}: SkillFormProps) {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);

  const { user } = usersGlobalStore() as IUsersGlobalStore;
  const formSchema = z.object({
    name: z.string().nonempty().min(3).max(50),
    level: z.number(),
    image: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValues?.name || "",
      level: initialValues?.level || 0,
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
        response = await addNewSkill(payload);
      } else {
        response = await editSkillById(initialValues.id, payload);
      }

      if (response.success) {
        toast.success(response.message);
        reloadData();
        setOpenSkillForm(false);
      } else {
        toast.error(response.error);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const skillImagePreview = useMemo(() => {
    if (selectedFile) {
      return URL.createObjectURL(selectedFile);
    }

    return initialValues?.image || "";
  }, [selectedFile]);

  return (
    <Dialog open={openSkillForm} onOpenChange={setOpenSkillForm}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {formType === "add" ? "Add New Skill" : "Edit Skill"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 mt-7"
          >
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
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        form.setValue("level", parseInt(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => {
                        setSelectedFile(e.target.files![0]);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {skillImagePreview && (
              <div className="p-2 border rounded w-max">
                <img
                  src={skillImagePreview}
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
      </DialogContent>
    </Dialog>
  );
}

export default SkillForm;