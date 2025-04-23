/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import MyBtn from "@/components/common/MyBtn";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import { useAddBannerMutation } from "@/redux/features/outher/other.api";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const AddBannerForm = () => {
  const [addBanner] = useAddBannerMutation();
  const router = useRouter()

  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Uploading Banner...");

    const formData = new FormData();

    formData.append("image", data.image);

    formData.append("data", JSON.stringify(data));

    try {
      const res = await addBanner(formData).unwrap();
      if (res) {
        toast.success("Banner Uploaded successfully", { id: toastId });
        router.push('/banner')
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Faild to Uploading Banner", {
        id: toastId,
      });
    }
  };
  return (
    <div className="w-2/3 mx-auto p-5 space-y-12">
      <h2 className="text-2xl font-semibold text-center">Banner</h2>
      <MyFormWrapper onSubmit={handleSubmit}>
        <MyFormInput name="title" label="Book name" />
        <MyFormInput name="creator" label="Writter name" />
        <MyFormInput name="image" type="file" label="Upload photo" />

        <MyBtn name="Add new" width="w-full" />
      </MyFormWrapper>
    </div>
  );
};

export default AddBannerForm;
