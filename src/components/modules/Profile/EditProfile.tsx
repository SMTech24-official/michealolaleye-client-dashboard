/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Spinner from "@/components/common/Spinner";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
} from "@/redux/features/auth/authApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import PhoneInput from "react-phone-input-2";
import { useEffect, useState } from "react";

const EditProfile = () => {
  const [updateProfile] = useUpdateProfileMutation();
  const { data, isFetching } = useGetMeQuery(undefined);
  const router = useRouter();
  const [number, setNumber] = useState<string>("");

  useEffect(() => {
    if (data?.data?.phoneNumber) {
      const cleaned = data.data.phoneNumber.replace("+", "");
      setNumber(cleaned);
    }
  }, [data]);

  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Updating Profile...");

    const formData = new FormData();

    if (data.profileImage) {
      formData.append("image", data.profileImage);
    }
    formData.append(
      "data",
      JSON.stringify({ ...data, phoneNumber: `+${number}` })
    );
    console.log({ ...data, phoneNumber: `+${number}` });
    try {
      const res = await updateProfile(formData).unwrap();
      if (res) {
        toast.success("Profile Updated successfully", { id: toastId });
        router.push("/profile");
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Faild to Updating Profile", {
        id: toastId,
      });
    }
  };

  if (isFetching) {
    return <Spinner />;
  }

  const user = data?.data;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-12">Edit</h2>
      <div className="max-w-4xl mx-auto">
        <MyFormWrapper
          onSubmit={handleSubmit}
          defaultValues={{
            profileImage: user.profileImage,
            fullName: user.fullName,
            location: user.location,
          }}
        >
          <MyFormInput name="profileImage" type="file" />
          <MyFormInput name="fullName" label="Your Name" />
          <MyFormInput name="location" label="Your Location" />
          {/* <MyFormInput name="phoneNumber" label="Your Phone Number" /> */}
          <p className="text-lg font-medium">Phone Number</p>
          <PhoneInput
            country={"ng"}
            value={number}
            onChange={(phone) => setNumber(phone)}
            inputStyle={{
              width: "100%",
              height: "57px",
              fontSize: "16px",
              borderBlockColor: "#7E1F7F40",
            }}
          />

          <div className="max-w-2xl mx-auto my-7 space-y-4">
            <button className="bg-primary border border-primary w-full rounded-lg py-2 text-white mb-5">
              Save
            </button>
            <Link href={"profile"}>
              <button
                type="button"
                className="border border-primary w-full rounded-lg py-2 text-primary"
              >
                Cancel
              </button>
            </Link>
          </div>
        </MyFormWrapper>
      </div>
    </div>
  );
};

export default EditProfile;
