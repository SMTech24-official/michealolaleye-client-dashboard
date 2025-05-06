/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Spinner from "@/components/common/Spinner";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormSelect from "@/components/form/MyFormSelect";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import {
  useGetSingleBookQuery,
  useUpdateBookMutation,
} from "@/redux/features/book/book.api";
import { useGetAllCategoryQuery } from "@/redux/features/outher/other.api";
import { TOptions } from "@/types/global.type";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { format } from "date-fns";

const EditBookForm = () => {
  const bookType = useSearchParams().get("type");
  const { id } = useParams();
  const { data, isFetching } = useGetSingleBookQuery(id);
  const [updateBook] = useUpdateBookMutation();
  const { data: category } = useGetAllCategoryQuery(undefined);

  const categoryData = category?.data;

  const categoryOpitons: TOptions[] = categoryData?.map(
    (item: { id: string; name: string }) => ({
      label: item.name,
      keyOption: item.id,
      value: item.id,
    })
  );

  // handle form
  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Uploading Book...");

    if (data.file instanceof File) {
      if (bookType === "EBOOK") {
        if (data.file.type !== "application/pdf") {
          toast.error("Ebook file must be a PDF.", { id: toastId });
          return;
        }
      } else {
        if (!data.file.type.startsWith("audio/")) {
          toast.error(
            "Audiobook file must be an audio format (mp3, aac, etc).",
            {
              id: toastId,
            }
          );
          return;
        }
      }
    }

    const totalPages = parseInt(data.totalPages, 10);

    if ((data.totalPages && isNaN(totalPages)) || totalPages <= 0) {
      toast.error("Invalid total pages. Please enter a valid number.", {
        id: toastId,
      });
      return;
    }
    const price = parseInt(data.price, 10);

    if (isNaN(price) || price <= 0) {
      toast.error("Invalid total pages. Please enter a valid number.", {
        id: toastId,
      });
      return;
    }

    const releaseDate = new Date(data.releaseDate).toISOString();

    let type;

    if (bookType === "EBOOK") {
      type = "EBOOK";
    } else {
      type = "AUDIOBOOK";
    }

    const bookData = { ...data, totalPages, price, releaseDate, type };

    const formData = new FormData();

    if (data.coverImage) {
      formData.append("cover", data.coverImage);
    }

    if (data.file) {
      formData.append("file", data.file);
    }

    formData.append("data", JSON.stringify(bookData));

    const updatedData = { id: id, data: formData };

    try {
      const res = await updateBook(updatedData).unwrap();
      if (res) {
        toast.success("Book Uploaded successfully", { id: toastId });
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Faild to Uploading Book", {
        id: toastId,
      });
    }
  };

  if (isFetching) {
    return <Spinner />;
  }

  const defaultData = data?.data;
  const date = new Date(defaultData?.releaseDate);
  const formattedDate = format(date, "dd-MMM-yyyy");

  return (
    <div>
      <h2 className="text-2xl font-medium mb-9">
        {bookType === "EBOOK" ? "Add new Ebook" : "Add new   Audiobook"}
      </h2>
      <MyFormWrapper onSubmit={handleSubmit} defaultValues={defaultData}>
        <div className="grid md:grid-cols-2 gap-y-3 gap-x-6 ">
          <MyFormInput name="bookName" label="Book name" />
          <MyFormInput name="writerName" label="Writer name" />
          <MyFormInput name="category" label="Category" />
          {bookType === "EBOOK" ? (
            <MyFormInput name="totalPages" label="Total page" />
          ) : (
            <MyFormInput name="totalSize" label="Total Size" />
          )}
          <MyFormInput name="length" label="Length" />
          <MyFormInput name="language" label="Language" />
          <MyFormInput name="formate" label="Format" />
          <MyFormInput name="publisher" label="Publisher" />
          <MyFormInput
            name="releaseDate"
            type="date"
            label={`Release: (${formattedDate})`}
          />
          <MyFormInput name="price" label="Price" />
          <MyFormSelect
            name="category"
            options={categoryOpitons}
            label="Select Category"
          />
          <MyFormInput name="description" type="textarea" label="Description" />
          <div className=" flex gap-4 items-center">
            <div className="w-4/5">
              <MyFormInput
                name="coverImage"
                type="file"
                label="Upload photo"
                acceptType="image/*"
              />
            </div>
            <Image
              src={defaultData?.coverImage}
              alt="image"
              height={150}
              width={150}
            />
          </div>
          <div className=" flex gap-4 items-center">
            <div className="w-4/5">
              <MyFormInput
                name="file"
                type="file"
                label={bookType === "EBOOK" ? "Upload pdf" : "Upload Audiobook"}
                filePlaceholder={
                  bookType === "EBOOK" ? "Upload pdf" : "mp3, aac, flac..."
                }
              />
            </div>
            {bookType === "EBOOK" ? (
              <a
                href={defaultData?.file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View PDF
              </a>
              // <iframe src={defaultData?.file} width="120px" height="160px" />
            ) : (
              <audio controls src={defaultData?.file}>
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        </div>

        <div className="max-w-2xl mx-auto my-7 space-y-4">
          <button className="bg-primary border border-primary w-full rounded-lg py-2 text-white mb-5">
            Save
          </button>
          <Link href={bookType === "EBOOK" ? "/ebook" : "/audiobook"}>
            <button
              type="button"
              className="border border-primary w-full rounded-lg py-2 text-primary"
            >
              Cancel
            </button>
          </Link>
        </div>
      </MyFormWrapper>
    </div>
  );
};

export default EditBookForm;
