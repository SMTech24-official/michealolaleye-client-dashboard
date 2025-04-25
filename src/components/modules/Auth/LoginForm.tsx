/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { setCookie } from "@/utils/cookies";
import { varifyToken } from "@/utils/verifyToken";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("login...");

    try {
      const res = await login(data).unwrap();
      const user = varifyToken(res.data.token) as TUser;

      if (user?.role !== "ADMIN") {
        return toast.error("Unauthorize Access", { id: toastId });
      } else {
        setCookie(res.data.token);
        dispatch(setUser({ user, token: res.data.token }));

        toast.success("Login success", { id: toastId });

        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Faild to login", { id: toastId });
    }
  };
  return (
    <div className="max-w-2xl mx-auto w-full">
      <MyFormWrapper onSubmit={onSubmit} className="space-y-4">
        <MyFormInput
          name="phoneNumber"
          inputClassName="md:py-4 py-2 md:px-5 px-5 "
          placeholder="Your registered Phone Number"
          label="Phone Number"
        />
        <MyFormInput
          type="password"
          name="password"
          inputClassName="md:py-4 py-2 md:px-5 px-5 "
          placeholder="Enter your correct password"
          label="Password"
        />
        <div className="flex justify-end">
          <Link href={"/forget-password"}>
            <button type="button">Forget password?</button>
          </Link>
        </div>

        <button className="bg-primary rounded-xl py-4 md:px-36 px-20 text-xl text-white w-full">
          Login
        </button>
      </MyFormWrapper>
    </div>
  );
};

export default LoginForm;
