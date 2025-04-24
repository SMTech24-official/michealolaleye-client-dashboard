/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import MyBtn from "@/components/common/MyBtn";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import { useAddPoinsMutation } from "@/redux/features/outher/other.api";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const AddRewardForm = () => {
  const [addPoint] = useAddPoinsMutation();
  const router = useRouter();

  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Adding Point...");

    const point = parseInt(data.point, 10);

    if (isNaN(point) || point <= 0) {
      toast.error("Invalid total pages. Please enter a valid number.", {
        id: toastId,
      });
      return;
    }

    const bookNumber = parseInt(data.bookNumber, 10);

    if (isNaN(bookNumber) || bookNumber <= 0) {
      toast.error("Invalid total pages. Please enter a valid number.", {
        id: toastId,
      });
      return;
    }

    const pointData = { ...data, point, bookNumber };

    try {
      const res = await addPoint(pointData).unwrap();
      if (res) {
        toast.success("Adding Point successfully", { id: toastId });
        router.push("/rewards");
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Faild to Adding Point", {
        id: toastId,
      });
    }
  };
  return (
    <div className="w-2/3 mx-auto p-5 space-y-12">
      <h2 className="text-2xl font-semibold text-center">Add New</h2>
      <MyFormWrapper onSubmit={handleSubmit}>
        <MyFormInput name="title" label="Title" />
        <MyFormInput name="point" label="Point" />
        <MyFormInput name="bookNumber" label="Book Number" />

        <MyBtn name="Add new" width="w-full" />
      </MyFormWrapper>
    </div>
  );
};

export default AddRewardForm;
