'use client'
import { deleteExperienceById } from "@/actions/experiences";
import { IExperience } from "@/interfaces";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

function ExperiencesTable({ experiences }: { experiences: IExperience[] }) {
  const [loading, setLoading] = React.useState(false);
  const [selectedExperienceIdToDelete, setSelectedExperienceIdToDelete] =
    React.useState<string | null>(null);
  const router = useRouter();
  const columns = [
    "Role",
    "Company",
    "Start Date",
    "End Date",
    "Location",
    "Created At",
    "Actions",
  ];

  const deleteExperienceHandler = async (id: string) => {
    try {
      setLoading(true);
      setSelectedExperienceIdToDelete(id);
      const response = await deleteExperienceById(id);
      if (!response.success) {
        throw new Error(response.message);
      }
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSelectedExperienceIdToDelete(null);
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
          {experiences.map((experience) => (
            <TableRow key={experience.id}>
              <TableCell>{experience.role}</TableCell>
              <TableCell>{experience.company}</TableCell>
              <TableCell>
                {dayjs(experience.start_date).format("MMM DD, YYYY")}
              </TableCell>
              <TableCell>
                {dayjs(experience.end_date).format("MMM DD, YYYY")}
              </TableCell>
              <TableCell>{experience.location}</TableCell>
              <TableCell>
                {dayjs(experience.created_at).format("MMM DD, YYYY hh:mm A")}
              </TableCell>
              <TableCell>
                <div className="flex gap-5">
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    onClick={() => deleteExperienceHandler(experience.id)}
                    disabled={
                      loading && selectedExperienceIdToDelete === experience.id
                    }
                  >
                    <Trash2 size={12} />
                  </Button>
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    onClick={() =>
                      router.push(`/account/experiences/edit/${experience.id}`)
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

export default ExperiencesTable;