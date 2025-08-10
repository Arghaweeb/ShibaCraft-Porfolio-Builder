"use client";
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
import { IEducation } from "@/interfaces";
import { deleteEducationById } from "@/actions/educations";

function EducationsTable({ educations }: { educations: IEducation[] }) {
  const [loading, setLoading] = React.useState(false);
  const [selectedEducationIdToDelete, setSelectedEducationIdToDelete] =
    React.useState<string | null>(null);
  const router = useRouter();
  const columns = [
    "Degree",
    "Institution",
    "Location",
    "Start Date",
    "End Date",
    "Percentage",
    "Created At",
    "Actions",
  ];

  const deleteEducationHandler = async (id: string) => {
    try {
      setLoading(true);
      setSelectedEducationIdToDelete(id);
      const response = await deleteEducationById(id);
      if (!response.success) {
        throw new Error(response.message);
      }
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSelectedEducationIdToDelete(null);
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
          {educations.map((education) => (
            <TableRow key={education.id}>
              <TableCell>{education.degree}</TableCell>
              <TableCell>{education.institution}</TableCell>
              <TableCell>{education.location}</TableCell>
              <TableCell>
                {dayjs(education.start_date).format("MMM DD, YYYY")}
              </TableCell>
              <TableCell>
                {dayjs(education.end_date).format("MMM DD, YYYY")}
              </TableCell>
              <TableCell>{education.percentage}</TableCell>
              <TableCell>
                {dayjs(education.created_at).format("MMM DD, YYYY hh:mm A")}
              </TableCell>
              <TableCell>
                <div className="flex gap-5">
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    onClick={() => deleteEducationHandler(education.id)}
                  >
                    <Trash2 size={12} />
                  </Button>
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    onClick={() =>
                      router.push(`/account/educations/edit/${education.id}`)
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

export default EducationsTable;