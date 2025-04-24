/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Spinner from "@/components/common/Spinner";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useAddRecomendedBookMutation,
  useGetAllBookQuery,
} from "@/redux/features/book/book.api";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import RedeemModal from "../../Rewards/Redeem/RedeemModal";
import Link from "next/link";

const SelectBookTable = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [addBook] = useAddRecomendedBookMutation();
  const query = useSearchParams().get("type");
  const comeFrom = useSearchParams().get("from");
  const { data, isFetching } = useGetAllBookQuery([
    { name: "type", value: query },
  ]);
  const router = useRouter();

  // handle Add Book
  const handleAddBook = async () => {
    const toastId = toast.loading("Book adding...");

    const bookIds = { bookId: selectedIds };

    try {
      const res = await addBook(bookIds).unwrap();
      if (res) {
        toast.success("Book added successfully", { id: toastId });
        setSelectedIds([]);
        if (comeFrom) {
          router.push("/rewards");
        }
        router.push("/");
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Faild to add Book", {
        id: toastId,
      });
    }
  };

  // Handle individual truck selection
  const handleSelectTruck = (id: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((truckId) => truckId !== id));
    }
  };

  // handle search
  const handleSubmit = () => {};

  if (isFetching) {
    return <Spinner />;
  }

  const item: any = data?.data?.data;

  return (
    <div className="bg-[#FFF8FF80] p-4 rounded-lg">
      <div className="flex justify-between gap-1">
        <h2 className="text-2xl font-medium">Ebook</h2>

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
                <Checkbox
                  id={`select-${item.id}`}
                  checked={selectedIds.includes(item.id)}
                  onCheckedChange={(checked) =>
                    handleSelectTruck(item.id, checked === true)
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="max-w-96 mx-auto my-7 ">
        {comeFrom === "rewards" ? (
          <RedeemModal bookIds={selectedIds} />
        ) : (
          <button
            onClick={handleAddBook}
            className="bg-primary border border-primary w-full rounded-lg py-2 text-white"
          >
            Save
          </button>
        )}

        <Link href={comeFrom === "rewards" ? "/rewards" : "/"}>
          <button className="border border-primary w-full rounded-lg py-2 text-primary mt-4">
            Cancel
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SelectBookTable;
