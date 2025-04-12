'use client'
import MyFormInput from "@/components/form/MyFormInput";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FieldValues } from "react-hook-form";

const BestsellingTable = () => {
  const handleSubmit = (data: FieldValues) => {
    console.log(data);
  };
  return (
    <div className="bg-[#FFF8FF80] p-4 rounded-lg">
      <div className="flex justify-between gap-1">
        <h2 className="text-2xl font-medium">Bestselling Books</h2>

        <div>
          <MyFormWrapper onSubmit={handleSubmit}>
            <MyFormInput name="search" />
          </MyFormWrapper>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xl font-medium text-black">Tittle</TableHead>
            <TableHead className="text-xl font-medium text-black">Writter</TableHead>
            <TableHead className="text-xl font-medium text-black">Category</TableHead>
            <TableHead className="text-right text-xl font-medium text-black">Sale</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="text-base">
            <TableCell>Soler bones
            & stardom</TableCell>
            <TableCell>Mike cormac
            & startac</TableCell>
            <TableCell>Story</TableCell>
            <TableCell className="text-right">$12</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default BestsellingTable;
