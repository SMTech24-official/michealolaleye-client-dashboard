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
import { useState } from "react";
import { FieldValues } from "react-hook-form";

const BestsellingTable = () => {
  const [searchValue, setSearchValue] = useState<string | undefined>("");
  const { data, isFetching } = useGetBestSellingBooksQuery([
    { name: "searchTerm", value: searchValue },
  ]);

  const handleSubmit = (data: FieldValues) => {
    setSearchValue(data.search);
  };

  if (isFetching) {
    return <Spinner />;
  }

  const item: any = data?.data?.data;

  return (
    <div className="bg-[#FFF8FF80] p-4 rounded-lg">
      <div className="flex justify-between gap-1">
        <h2 className="text-2xl font-medium">Bestselling Books</h2>

        <div className="flex gap-3">
          <div className="inline-block">
            <button
              onClick={() => setSearchValue("")}
              className="bg-primary px-4 py-3 rounded-lg flex items-center gap-2 text-white"
            >
              All
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
              Title
            </TableHead>
            <TableHead className="text-xl font-medium text-black">
              Writer
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
