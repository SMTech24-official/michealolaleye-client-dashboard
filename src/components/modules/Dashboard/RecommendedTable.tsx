"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import SeletBookTypeModal from "./SeletBookTypeModal";

const RecommendedTable = () => {
  const item = [1, 2, 3, 4];

  return (
    <div className="bg-[#FFF8FF80] p-4 rounded-lg">
      <div className="flex justify-between gap-1 mb-8">
        <h2 className="text-2xl font-medium">Recommended Books</h2>

        <SeletBookTypeModal />
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
              Sale
            </TableHead>
            <TableHead className="text-xl font-medium text-black">
              Delete
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {item.map((item, idx) => (
            <TableRow key={idx} className="text-base ">
              <TableCell className="py-4">Soler bones & stardom</TableCell>
              <TableCell>Mike cormac & startac</TableCell>
              <TableCell>$12</TableCell>
              <TableCell className="flex justify-center">
                <button>
                  <Trash2 className="text-red-500 hover:text-primary" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecommendedTable;
