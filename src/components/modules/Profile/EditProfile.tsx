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

const EditProfile = () => {
  const [updateProfile] = useUpdateProfileMutation();
  const { data, isFetching } = useGetMeQuery(undefined);
  const router = useRouter()

  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Updating Profile...");

    const formData = new FormData();

    if (data.profileImage) {
      formData.append("image", data.profileImage);
    }
    formData.append("data", JSON.stringify(data));

    try {
      const res = await updateProfile(formData).unwrap();
      if (res) {
        toast.success("Profile Updated successfully", { id: toastId });
        router.push('/profile')
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
  console.log(user);
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-12">Edit</h2>
      <div className="max-w-4xl mx-auto">
        <MyFormWrapper onSubmit={handleSubmit} defaultValues={user}>
          <MyFormInput name="profileImage" type="file" />
          <MyFormInput name="fullName" label="Your Name" />
          <MyFormInput name="location" label="Your Location" />
          <MyFormInput name="phoneNumber" label="Your Phone Number" />

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
