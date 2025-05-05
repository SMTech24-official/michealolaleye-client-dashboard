/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import MyBtn from "@/components/common/MyBtn";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import { useGetAllBookQuery } from "@/redux/features/book/book.api";
import { useAddBannerMutation } from "@/redux/features/outher/other.api";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Spinner from "@/components/common/Spinner";
import Image from "next/image";

type TBook = {
  id: string;
  bookName: string;
  writerName: string;
};

const AddBannerForm = () => {
  const [searchValue, setSearchValue] = useState<string | undefined>("");
  const [selectedBook, setBook] = useState<TBook | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [addBanner] = useAddBannerMutation();
  console.log(selectedBook);
  const { data, isFetching } = useGetAllBookQuery([
    { name: "searchTerm", value: searchValue },
  ]);
  const router = useRouter();

  //handle search
  const handleSearch = (data: FieldValues) => {
    setSearchValue(data.search);
  };

  // handle select
  const handleSelect = (data: TBook) => {
    setBook(data);
    setIsOpen(false);
  };

  // handle submit
  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Uploading Banner...");

    if (!selectedBook) {
      toast.warning("Please select a book first", { id: toastId });
      return;
    }

    const bannerData = {
      creator: selectedBook?.writerName,
      title: selectedBook?.bookName,
      bookId: selectedBook?.id,
    };

    const formData = new FormData();

    formData.append("image", data.image);

    formData.append("data", JSON.stringify(bannerData));

    try {
      const res = await addBanner(formData).unwrap();
      if (res) {
        toast.success("Banner Uploaded successfully", { id: toastId });
        setBook(null);
        setSearchValue("");
        router.push("/banner");
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Faild to Uploading Banner", {
        id: toastId,
      });
    }
  };

  if (isFetching) {
    return <Spinner />;
  }

  const item: any = data?.data?.data;

  const defaultData = {
    writerName: selectedBook?.writerName,
    bookName: selectedBook?.bookName,
  };

  return (
    <div className="w-2/3 mx-auto p-5 space-y-12">
      <h2 className="text-2xl font-semibold text-center">Banner</h2>

      <div className="relative">
        <p className="md:text-xl text-[15px] text-grayText font-medium mb-2">
          Search book
        </p>
        <div onClick={() => setIsOpen(true)} className="flex gap-3">
          <MyFormWrapper onSubmit={handleSearch} className="w-full">
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

        <div
          className={`${
            isOpen ? " absolute" : "hidden"
          }  inset-0 w-full h-[450px] top-28 bg-secondary overflow-y-auto z-50`}
        >
          {item?.length <= 0 ? (
            <div className="text-lg font-medium text-center text-primary">
              No data found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xl font-medium text-black">
                    Image
                  </TableHead>
                  <TableHead className="text-xl font-medium text-black">
                    bookName
                  </TableHead>
                  <TableHead className="text-xl font-medium text-black">
                    Writer
                  </TableHead>
                  <TableHead className="text-xl font-medium text-black">
                    Category
                  </TableHead>
                  <TableHead className="text-xl font-medium text-black">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {item?.map((item: any, idx: number) => (
                  <TableRow key={idx} className="text-base ">
                    <TableCell className="py-2">
                      <Image
                        src={item?.coverImage}
                        alt="image"
                        height={60}
                        width={60}
                        className="h-14 w-12"
                        priority
                      />
                    </TableCell>
                    <TableCell>{item.bookName}</TableCell>
                    <TableCell>{item.writerName}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => handleSelect(item)}
                        className="bg-primary/5 px-5 py-2 rounded-lg text-primary"
                      >
                        Selcet
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      <MyFormWrapper onSubmit={handleSubmit} defaultValues={defaultData}>
        <MyFormInput name="bookName" label="Book name" />
        <MyFormInput name="writerName" label="Writer name" />
        <MyFormInput name="image" type="file" label="Banner photo" />

        <MyBtn name="Add new" width="w-full" />
      </MyFormWrapper>
    </div>
  );
};

export default AddBannerForm;
