/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useGetAllBookQuery } from "@/redux/features/book/book.api";
import Spinner from "@/components/common/Spinner";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const BookTable = () => {
  const [searchValue, setSearchValue] = useState<string | undefined>("");
  const pathName = usePathname();

  let bookType = "";
  if (pathName === "/ebook") {
    bookType = "EBOOK";
  } else {
    bookType = "AUDIOBOOK";
  }

  const { data, isFetching } = useGetAllBookQuery([
    { name: "type", value: bookType },
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
        <h2 className="text-2xl font-medium">
          {pathName === "/ebook" ? "Ebook" : "Audiobook"}
        </h2>

        <div className="flex gap-12 ">
          <div className="inline-block">
            <Link href={{ pathname: "/add-book", query: { type: bookType } }}>
              <button className="bg-primary px-6 py-3 rounded-lg flex items-center gap-2 text-white">
                <Plus /> Add new
              </button>
            </Link>
          </div>
          <div className="flex gap-3 ">
            <MyFormWrapper onSubmit={handleSubmit}>
              <div className="relative">
                <MyFormInput name="search" inputClassName="px-12" />
                <button>
                  <Search className="absolute top-3 left-2 " />
                </button>
              </div>
            </MyFormWrapper>
            <div className="inline-block">
              <button
                onClick={() => setSearchValue("")}
                className="bg-primary px-6 py-3 rounded-lg flex items-center gap-2 text-white"
              >
                All
              </button>
            </div>
          </div>
        </div>
      </div>
      {item?.length <= 0 ? (
        <div className="text-lg font-medium text-center text-primary">
          No data found
        </div>
      ) : (
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
              <TableHead className=" text-xl font-medium text-black">
                Sale
              </TableHead>
              <TableHead className=" text-xl font-medium text-black">
                Edit
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {item?.map((item: any, idx: number) => (
              <TableRow key={idx} className="text-base ">
                <TableCell className="py-4">{item.bookName}</TableCell>
                <TableCell>{item.writerName}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.perseCount}</TableCell>
                <TableCell>
                  <Link
                    href={{
                      pathname: `/edit-book/${item.id}`,
                      query: { type: bookType },
                    }}
                  >
                    <FaRegEdit className="text-xl font-light" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default BookTable;
