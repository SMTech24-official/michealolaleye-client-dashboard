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
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ForgetPassword = () => {
  const [number, setNumber] = useState<string>("");
  const [stage, setStage] = useState<string>("otpSend");
  const router = useRouter();
  const [sendOtp] = useSendOtpMutation();
  const [varifyOtp] = useVerifyOtpMutation();
  const [resetPass] = useResetPasswordMutation();

  // send otp
  const otpSend = async () => {
    const toastId = toast.loading("OTP sending...");

    try {
      const res = await sendOtp({ phoneNumber: number }).unwrap();
      if (res) {
        toast.success("OTP send successfully", { id: toastId });
        setStage("verifyOtp");
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Faild to send OTP", {
        id: toastId,
      });
    }
  };

  // verify otp
  const verifyOtp = async (data: FieldValues) => {
    const toastId = toast.loading("OTP verify...");

    const verifyData = { ...data, phoneNumber: number };

    try {
      const res = await varifyOtp(verifyData).unwrap();
      if (res) {
        toast.success("OTP verified successfully", { id: toastId });
        setStage("resetPassword");
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Faild to varify OTP", {
        id: toastId,
      });
    }
  };

  const resetPassword = async (data: FieldValues) => {
    const toastId = toast.loading("Reset Password...");

    const resetData = { ...data, phoneNumber: number };

    try {
      const res = await resetPass(resetData).unwrap();
      if (res) {
        toast.success("Reset Password successfully", { id: toastId });
        router.push("/login");
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Faild to Reset Password", {
        id: toastId,
      });
    }
  };
  return (
    <div className="max-w-xl mx-auto h-screen flex justify-center items-center">
      {stage === "otpSend" ? (
        <div className="space-y-12 w-full ">
          <h1 className="text-3xl font-medium text-primary text-center">
            Forget password
          </h1>
          <MyFormWrapper onSubmit={otpSend} className="space-y-8">
            <div className="space-y-2">
              <p>Mobile Number</p>
              <PhoneInput
                country={"us"}
                value={number}
                onChange={(phone) => setNumber(phone)}
                inputStyle={{
                  width: "100%",
                  height: "48px",
                  fontSize: "16px",
                  borderBlockColor: "#7E1F7F40",
                }}
              />
            </div>
            <MyBtn name="Next" width="w-full" />
          </MyFormWrapper>
        </div>
      ) : stage === "verifyOtp" ? (
        <div className="space-y-12 w-full ">
          <h1 className="text-3xl font-medium text-primary text-center">
            OTP Verification
          </h1>
          <MyFormWrapper onSubmit={verifyOtp}>
            <MyFormInput name="otp" label="We’ve sent a code to you number" />
            <MyBtn name="Next" width="w-full" />
          </MyFormWrapper>
        </div>
      ) : (
        <div className="space-y-12 w-full ">
          <h1 className="text-3xl font-medium text-primary text-center">
            Set new password
          </h1>
          <MyFormWrapper onSubmit={resetPassword}>
            <MyFormInput name="password" label="Enter New Password" />
            <MyBtn name="Save" width="w-full" />
          </MyFormWrapper>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
