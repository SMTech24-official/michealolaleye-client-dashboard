/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useDeleteBannerMutation,
  useDeleteCategoryMutation,
} from "@/redux/features/outher/other.api";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";

interface DeleteModalProps {
  id: string;
  type: "category" | "banner";
  btn: "icon" | "btn";
}

const DeleteModal = ({ id, type, btn }: DeleteModalProps) => {
  const [open, setOpen] = useState(false);
  const [deleteBanner] = useDeleteBannerMutation();
  const [deletecategory] = useDeleteCategoryMutation();

  const handleDelete = async () => {
    const toastId = toast.loading(`Deleting...`);
    try {
      let res;
      if (type === "category") {
        res = await deletecategory(id).unwrap();
      } else if (type === "banner") {
        res = await deleteBanner(id).unwrap();
      }

      if (res.data) {
        toast.success("Deleted Successfully", { id: toastId });
        setOpen(false);
      } else {
        toast.error(res?.error?.data?.message || "Failed to Delete", {
          id: toastId,
        });
        setOpen(false);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || `Failed to delete ${type}`, {
        id: toastId,
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {btn === "icon" ? (
        <DialogTrigger className=" flex justify-center items-center">
          <RxCross2 className="text-red-600 font-semibold text-xl" />
        </DialogTrigger>
      ) : (
        <DialogTrigger className="gradient-border md:w-2/5">
          <div className="content">Delete</div>
        </DialogTrigger>
      )}

      <DialogContent className="max-w-[450px] !rounded-3xl [&>button]:hidden">
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-col justify-center items-center gap-5 text-center">
              <h3 className="text-xl font-medium">
                Are you sure you want to proceed?
              </h3>
              <div className="flex md:gap-5 gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="bg-red-400 py-2 px-6 rounded-lg font-normal text-white"
                >
                  Cancle
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-primary py-2 px-6 rounded-lg font-normal text-white"
                >
                  Confirm
                </button>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
