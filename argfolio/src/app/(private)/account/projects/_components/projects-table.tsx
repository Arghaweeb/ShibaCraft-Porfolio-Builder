"use client";
import { Button } from "@/components/ui/button";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { IProject } from "@/interfaces";
import { Pencil, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { deleteProjectById } from "@/actions/projects";
// import { deleteProjectById } from "@/actions/projects";

function ProjectsTable({ projects }: { projects: IProject[] }) {
  const [loading, setLoading] = React.useState(false);
  const [selectedProjectIdToDelete, setSelectedProjectIdToDelete] =
    React.useState<string | null>(null);
  const router = useRouter();
  const columns = ["Name", "Demo Link", "Repo Link", "Created At", "Actions"];

  const deleteProjectHandler = async (id: string) => {
    try {
      setLoading(true);
      setSelectedProjectIdToDelete(id);
      const response = await deleteProjectById(id);
      if (!response.success) {
        throw new Error(response.message);
      }
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSelectedProjectIdToDelete(null);
      setLoading(false);
    }
  };

  return (
    <div className="mt-7">
      <Table className="border border-gray-400">
        <TableHeader className="bg-gray-200 font-semibold">
          <TableRow className="font-semibold">
            {columns.map((column, index) => (
              <TableHead className="font-bold" key={index}>
                {column}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.demo_link}</TableCell>
              <TableCell>{project.repo_link}</TableCell>
              <TableCell>
                {dayjs(project.created_at).format("MMM DD, YYYY hh:mm A")}
              </TableCell>
              <TableCell>
                <div className="flex gap-5">
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    onClick={() => deleteProjectHandler(project.id)}
                    disabled={
                      loading && selectedProjectIdToDelete === project.id
                    }
                  >
                    <Trash2 size={12} />
                  </Button>
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    onClick={() =>
                      router.push(`/account/projects/edit/${project.id}`)
                    }
                  >
                    <Pencil size={12} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ProjectsTable;
