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
import { useAddRedeemMutation } from "@/redux/features/outher/other.api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const RedeemModal = ({ bookIds }: { bookIds: string[] }) => {
  const [open, setOpen] = useState(false);
  const [addRedeem] = useAddRedeemMutation();
  const router = useRouter()

  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Book adding...");

    const point = parseInt(data.point, 10);

    if (isNaN(point) || point <= 0) {
      toast.error("Invalid points. Please enter a valid number.", {
        id: toastId,
      });
      return;
    }

    const redeemData = { point, bookId: bookIds };

    try {
      const res = await addRedeem(redeemData).unwrap();
      if (res) {
        toast.success("Book added successfully", { id: toastId });
        setOpen(false);
        router.push('/rewards')
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Faild to add Book", {
        id: toastId,
      });
    }
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="bg-primary border border-primary w-full rounded-lg py-2 text-white">
          Save
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Points</DialogTitle>
            <DialogDescription></DialogDescription>
            <MyFormWrapper onSubmit={handleSubmit}>
              <MyFormInput name="point" placeholder="Enter points" />
              <span className=" flex gap-3 justify-between">
                <MyBtn name="Done" width="w-1/2" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-red-500 border border-red-500 py-3 w-1/2 rounded-lg"
                >
                  Cancel
                </button>
              </span>
            </MyFormWrapper>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RedeemModal;
