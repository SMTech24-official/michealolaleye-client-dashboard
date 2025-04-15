"use client";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import { FaRegEdit } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search } from "lucide-react";
import { FieldValues } from "react-hook-form";

const AudiobookTable = () => {
  const item = [1, 2, 3, 4];

  const handleSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div className="bg-[#FFF8FF80] p-4 rounded-lg">
      <div className="flex justify-between gap-1">
        <h2 className="text-2xl font-medium">Audiobook</h2>

        <div className="flex gap-12 ">
          <div className="inline-block">
          <button className="bg-primary px-6 py-3 rounded-lg flex items-center gap-2 text-white">
            <Plus /> Add new
          </button>
          </div>
          <MyFormWrapper onSubmit={handleSubmit}>
            <div className="relative">
              <MyFormInput name="search" inputClassName="px-12" />
              <button>
                <Search className="absolute top-3 left-2 " />
              </button>
            </div>
          </MyFormWrapper>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xl font-medium text-black">
              Tittle
            </TableHead>
            <TableHead className="text-xl font-medium text-black">
              Writter
            </TableHead>
            <TableHead className="text-xl font-medium text-black">
              Category
            </TableHead>
            <TableHead className=" text-xl font-medium text-black">
              Sale
            </TableHead>
            <TableHead className=" text-xl font-medium text-black">
              Edit
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {item.map((item, idx) => (
            <TableRow key={idx} className="text-base ">
              <TableCell className="py-4">Soler bones & stardom</TableCell>
              <TableCell>Mike cormac & startac</TableCell>
              <TableCell>Story</TableCell>
              <TableCell>12</TableCell>
              <TableCell>
                <FaRegEdit className="text-xl font-light" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AudiobookTable;
