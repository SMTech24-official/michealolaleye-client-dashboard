/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import MyBtn from "@/components/common/MyBtn";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import {
  useResetPasswordMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const ForgetPassword = () => {
  const [number, setNumber] = useState<string>("");
  const [stage, setStage] = useState<string>("otpSend");
  const router = useRouter();
  const [sendOtp] = useSendOtpMutation();
  const [varifyOtp] = useVerifyOtpMutation();
  const [resetPass] = useResetPasswordMutation();

  // send otp
  const otpSend = async (data: FieldValues) => {
    setNumber(data.phoneNumber);
    const toastId = toast.loading("Uploading Category...");

    try {
      const res = await sendOtp(data).unwrap();
      if (res) {
        toast.success("Category Uploaded successfully", { id: toastId });
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Faild to Uploading Category", {
        id: toastId,
      });
    }
  };

  // verify otp
  const verifyOtp = async (data: FieldValues) => {
    const toastId = toast.loading("Uploading Category...");

    const verifyData = { ...data, phoneNumber: number };

    try {
      const res = await varifyOtp(verifyData).unwrap();
      if (res) {
        toast.success("Category Uploaded successfully", { id: toastId });
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Faild to Uploading Category", {
        id: toastId,
      });
    }
  };

  const resetPassword = async (data: FieldValues) => {
    const toastId = toast.loading("Uploading Category...");

    const resetData = { ...data, phoneNumber: number };

    try {
      const res = await resetPass(resetData).unwrap();
      if (res) {
        toast.success("Category Uploaded successfully", { id: toastId });
        router.push("/login");
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Faild to Uploading Category", {
        id: toastId,
      });
    }
  };
  return (
    <div className="max-w-xl mx-auto h-screen flex justify-center items-center">
      <div className="space-y-12 w-full ">
        <h1 className="text-3xl font-medium text-primary text-center">
          Forget password
        </h1>
        <MyFormWrapper onSubmit={otpSend}>
          <MyFormInput name="phoneNumber" label="Mobile Number" />
          <MyBtn name="Next" width="w-full" />
        </MyFormWrapper>
      </div>
      <div className="space-y-12 w-full ">
        <h1 className="text-3xl font-medium text-primary text-center">
          OTP Verification
        </h1>
        <MyFormWrapper onSubmit={verifyOtp}>
          <MyFormInput
            name="otp"
            label="We’ve sent a code reset to: 12324981273"
          />
          <MyBtn name="Next" width="w-full" />
        </MyFormWrapper>
      </div>
      <div className="space-y-12 w-full ">
        <h1 className="text-3xl font-medium text-primary text-center">
          Set new password
        </h1>
        <MyFormWrapper onSubmit={resetPassword}>
          <MyFormInput
            name="otp"
            label="We’ve sent a code reset to: 12324981273"
          />
          <MyBtn name="Save" width="w-full" />
        </MyFormWrapper>
      </div>
    </div>
  );
};

export default ForgetPassword;
