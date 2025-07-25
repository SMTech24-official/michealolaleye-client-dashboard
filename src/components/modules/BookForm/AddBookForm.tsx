/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormSelect from "@/components/form/MyFormSelect";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import { useAddBookMutation } from "@/redux/features/book/book.api";
import { useGetAllCategoryQuery } from "@/redux/features/outher/other.api";
import { useSendNotificationMutation } from "@/redux/features/user/user.api";
import { TOptions } from "@/types/global.type";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const AddBookForm = () => {
  const bookType = useSearchParams().get("type");
  const [addBook] = useAddBookMutation();
  const { data } = useGetAllCategoryQuery(undefined);
  const [sendNotification] = useSendNotificationMutation();
  const router = useRouter();

  const categoryData = data?.data;

  const categoryOpitons: TOptions[] = categoryData?.map(
    (item: { id: string; name: string }) => ({
      label: item.name,
      keyOption: item.id,
      value: item.name,
    })
  );

  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Uploading Book...");

    if (bookType === "EBOOK") {
      const file: File = data.file;

      if (file.type !== "application/pdf") {
        toast.error("Ebook file must be a PDF.", { id: toastId });
        return;
      }
    } else {
      const file: File = data.file;
      if (!file?.type.startsWith("audio/")) {
        toast.error("Audiobook file must be an audio format (mp3, aac, etc).", {
          id: toastId,
        });
        return;
      }
    }

    const totalPages = parseInt(data.totalPages, 10);

    if ((data.totalPages && isNaN(totalPages)) || totalPages <= 0) {
      toast.error("Invalid total pages. Please enter a valid number.", {
        id: toastId,
      });
      return;
    }

    const price = parseFloat(data.price);

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

    formData.append("cover", data.coverImage);
    formData.append("file", data.file);

    formData.append("data", JSON.stringify(bookData));

    const notificationData = {
      title: "New Book Available!",
      body: `Explore our latest addition: "${data.bookName}". Check it out now!`,
    };

    try {
      const res = await addBook(formData).unwrap();
      if (res) {
        await sendNotification(notificationData).unwrap();
        toast.success("Book Uploaded successfully", { id: toastId });

        if (bookType === "EBOOK") {
          router.push("/ebook");
        } else {
          router.push("/audiobook");
        }
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Faild to Uploading Book", {
        id: toastId,
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-medium mb-9">
        {bookType === "EBOOK" ? "Add new Ebook" : "Add new   Audiobook"}
      </h2>
      <MyFormWrapper onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-y-3 gap-x-6 ">
          <MyFormInput name="bookName" label="Book name" />
          <MyFormInput name="writerName" label="Writer name" />
          {bookType === "EBOOK" ? (
            <MyFormInput name="totalPages" label="Total page" />
          ) : (
            <MyFormInput name="totalSize" label="Total Size" />
          )}
          <MyFormInput name="length" label="Length" />
          <MyFormInput name="language" label="Language" />
          <MyFormInput name="formate" label="Format" />
          <MyFormInput name="publisher" label="Publisher" />
          <MyFormInput name="releaseDate" type="date" label="Release" />
          <MyFormInput name="price" label="Price" />
          <MyFormSelect
            name="category"
            options={categoryOpitons}
            label="Select Category"
          />
          <MyFormInput name="productId" label="Product Id" />
          <MyFormInput name="description" type="textarea" label="Description" />
          <MyFormInput
            name="coverImage"
            type="file"
            label="Upload photo"
            acceptType="image/*"
          />
          <MyFormInput
            name="file"
            type="file"
            label={bookType === "EBOOK" ? "Upload pdf" : "Upload Audiobook"}
            filePlaceholder={
              bookType === "EBOOK" ? "Upload pdf" : "mp3, aac, flac..."
            }
          />
        </div>

        <div className="max-w-2xl mx-auto my-7 space-y-4">
          <button className="bg-primary border border-primary w-full rounded-lg py-2 text-white mb-5">
            Save
          </button>
          <Link href={bookType === "EBOOK" ? "/ebook" : "audiobook"}>
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

export default AddBookForm;
