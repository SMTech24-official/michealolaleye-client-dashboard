/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useGetRecomendedBooksQuery } from "@/redux/features/book/book.api";
import Spinner from "@/components/common/Spinner";

const RecommendedTable = () => {
  const { data, isFetching } = useGetRecomendedBooksQuery(undefined);

  if (isFetching) {
    return <Spinner />;
  }

  const item: any = data?.data;
  console.log(item);
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
            <TableHead className="text-xl font-medium text-black text-end">
              Delete
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {item?.map((item: any, idx: number) => (
            <TableRow key={idx} className="text-base ">
              <TableCell className="py-4">{item.bookName}</TableCell>
              <TableCell>{item.writerName}</TableCell>
              <TableCell>{item.perseCount}</TableCell>
              <TableCell className="flex justify-end">
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
