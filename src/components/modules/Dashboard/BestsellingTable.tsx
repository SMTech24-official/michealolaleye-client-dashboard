/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Spinner from "@/components/common/Spinner";
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
import { useGetBestSellingBooksQuery } from "@/redux/features/book/book.api";
import { Search } from "lucide-react";
import { FieldValues } from "react-hook-form";

const BestsellingTable = () => {
  const { data, isFetching } = useGetBestSellingBooksQuery(undefined);

  const handleSubmit = (data: FieldValues) => {
    console.log(data);
  };

  if (isFetching) {
    return <Spinner />;
  }

  const item: any = data?.data;

  return (
    <div className="bg-[#FFF8FF80] p-4 rounded-lg">
      <div className="flex justify-between gap-1">
        <h2 className="text-2xl font-medium">Bestselling Books</h2>

        <div>
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
            <TableHead className="text-right text-xl font-medium text-black">
              Sale
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {item?.map((item: any, idx: number) => (
            <TableRow key={idx} className="text-base ">
              <TableCell className="py-4">{item.bookName}</TableCell>
              <TableCell>{item.writerName}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell className="text-end">{item.perseCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BestsellingTable;
