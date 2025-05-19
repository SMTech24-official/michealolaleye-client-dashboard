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
  useDeleteBookMutation,
  useDeleteRecomendedBookMutation,
} from "@/redux/features/book/book.api";
import {
  useDeleteBannerMutation,
  useDeleteCategoryMutation,
  useDeletePoinsMutation,
  useDeleteRedeemMutation,
} from "@/redux/features/outher/other.api";
import { useBlackUserMutation } from "@/redux/features/user/user.api";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";

interface DeleteModalProps {
  id: string;
  type:
    | "category"
    | "banner"
    | "point"
    | "redeem"
    | "recomendedBook"
    | "blockUser"
    | "book";
  btn: "icon" | "btn" | "text";
  btnText?: string;
  message?: string;
}

const DeleteModal = ({ id, type, btn, btnText, message }: DeleteModalProps) => {
  const [open, setOpen] = useState(false);
  const [deleteBanner] = useDeleteBannerMutation();
  const [deletecategory] = useDeleteCategoryMutation();
  const [deletePoint] = useDeletePoinsMutation();
  const [deleteRedeem] = useDeleteRedeemMutation();
  const [deleteRecomendedBook] = useDeleteRecomendedBookMutation();
  const [blockUser] = useBlackUserMutation();
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async () => {
    const toastId = toast.loading(`Processing...`);
    try {
      let res;
      if (type === "category") {
        res = await deletecategory(id).unwrap();
      } else if (type === "banner") {
        res = await deleteBanner(id).unwrap();
      } else if (type === "point") {
        res = await deletePoint(id).unwrap();
      } else if (type === "redeem") {
        res = await deleteRedeem(id).unwrap();
      } else if (type === "recomendedBook") {
        res = await deleteRecomendedBook(id).unwrap();
      } else if (type === "blockUser") {
        res = await blockUser(id).unwrap();
      } else if (type === "book") {
        res = await deleteBook(id).unwrap();
      }

      if (res.data) {
        toast.success(`${message || "Deleted"} Successfully`, { id: toastId });
        setOpen(false);
      } else {
        toast.error(
          res?.error?.data?.message || `Failed to ${message || "Delete"}`,
          {
            id: toastId,
          }
        );
        setOpen(false);
      }
    } catch (err: any) {
      toast.error(
        err?.data?.message || `Failed to ${message || "Delete"} ${type}`,
        {
          id: toastId,
        }
      );
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {btn === "icon" ? (
        <DialogTrigger className=" flex justify-center items-center">
          <RxCross2 className="text-red-600 font-semibold text-xl" />
        </DialogTrigger>
      ) : btn === "text" ? (
        <DialogTrigger className=" flex justify-center items-center bg-primary px-3 py-2 text-white rounded-lg">
          {btnText}
        </DialogTrigger>
      ) : (
        <DialogTrigger className="gradient-border md:w-2/5">
          <Trash2 className="text-red-500 hover:text-primary" />
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
                  className="bg-red-600 py-2 px-6 rounded-lg font-normal text-white"
                >
                  Cancel
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
