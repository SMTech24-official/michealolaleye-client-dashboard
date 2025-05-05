/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import MyBtn from "@/components/common/MyBtn";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUpdateCategoryMutation } from "@/redux/features/outher/other.api";
import { Edit } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TPayload = {
  id: string;
  image: string;
  name: string;
};

const EditCategoryModal = ({ payload }: { payload: TPayload }) => {
  const [open, setOpen] = useState(false);
  const [updateCatrgory] = useUpdateCategoryMutation();

  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Updating...");

    const { createdAt, updatedAt, id, ...rest } = data;

    const formData = new FormData();

    formData.append("image", data.image);

    formData.append("data", JSON.stringify(rest));

    const catedoryData = { id: payload.id, data: formData };

    try {
      const res = await updateCatrgory(catedoryData).unwrap();
      if (res) {
        toast.success("Updated successfully", { id: toastId });
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Faild to Updating", {
        id: toastId,
      });
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Edit className="w-4 text-primary" />{" "}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              Edit Catrgory
            </DialogTitle>
            <DialogDescription></DialogDescription>
            <div className="">
              <MyFormWrapper onSubmit={handleSubmit} defaultValues={payload}>
                <MyFormInput name="name" label="Category name" />
                <MyFormInput name="image" type="file" label="Upload photo" />

                <div className="w-full flex justify-center my-5">
                  <Image
                    src={payload.image}
                    height={100}
                    width={100}
                    alt="image"
                  />
                </div>

                <MyBtn name="Confirm" width="w-full" />
              </MyFormWrapper>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditCategoryModal;
