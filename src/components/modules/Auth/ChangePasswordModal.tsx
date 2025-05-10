/* eslint-disable @typescript-eslint/no-explicit-any */
import MyBtn from "@/components/common/MyBtn";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TInputData = {
  id: string;
  fullName: string;
  phoneNumber: string;
};

const ChangePasswordModal = ({ payload }: { payload: TInputData }) => {
  const [open, setOpen] = useState(false);
  const [resetPass] = useResetPasswordMutation();

  const resetPassword = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("Reset Password...");

    const resetData = { ...data, phoneNumber: `${payload.phoneNumber}` };

    try {
      const res = await resetPass(resetData).unwrap();
      if (res) {
        toast.success("Reset Password successfully", { id: toastId });
        setOpen(false);
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Faild to Reset Password", {
        id: toastId,
      });
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className=" flex justify-center items-center bg-primary px-3 py-2 text-white rounded-lg">
          Change Passord
        </DialogTrigger>

        <DialogContent className="max-w-[650px] !rounded-3xl [&>button]:hidden">
          <DialogHeader>
            <DialogTitle>
              <div className="flex flex-col justify-center items-center gap-5 text-center">
                <h1 className="text-3xl font-medium  text-center">
                  Set new password for
                  <span className="text-primary"> {payload.fullName}</span>
                </h1>
                <div className="flex md:gap-5 gap-3">
                  <MyFormWrapper onSubmit={resetPassword}>
                    <MyFormInput name="password" label="Enter New Password" />
                    <MyBtn name="Save" width="w-full" />
                  </MyFormWrapper>
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChangePasswordModal;
