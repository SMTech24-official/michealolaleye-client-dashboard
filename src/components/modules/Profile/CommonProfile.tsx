"use client";
import Spinner from "@/components/common/Spinner";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { BsTelephone } from "react-icons/bs";
import Link from "next/link";

const CommonProfile = () => {
  const { data, isFetching } = useGetMeQuery(undefined);

  if (isFetching) {
    return <Spinner />;
  }

  const user = data?.data;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-12">Profile</h2>

      <div className="bg-primary text-white flex justify-between items-center py-5 px-12 rounded-xl ">
        <div className="flex gap-2 items-center">
          {user?.profileImage ? (
            <Image
              src={user?.profileImage}
              alt="profile image"
              width={100}
              height={100}
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <FaRegUserCircle className="md:text-5xl text-3xl rounded-full" />
          )}
          <p>{user?.fullName}</p>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2 items-center">
            <IoLocationOutline className="text-xl" />
            <p>{user?.location}</p>
          </div>
          <div className="flex gap-2 items-center">
            <BsTelephone className="text-lg" />
            <p>{user?.phoneNumber}</p>
          </div>
        </div>

        <Link href={'/edit-profile'}>
          <button className="bg-white text-black px-12 py-3 rounded-lg">
            Edit
          </button>
        </Link>
      </div>

      <h2 className="text-xl font-medium my-10">Personal Information</h2>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <p className="font-medium">Name</p>
          <div className="bg-secondary p-4 rounded-lg">{user?.fullName}</div>
        </div>
        <div className="space-y-2">
          <p className="font-medium">Your Phone Number</p>
          <div className="bg-secondary p-4 rounded-lg">{user?.phoneNumber}</div>
        </div>
        <div className="space-y-2">
          <p className="font-medium">Your Location</p>
          <div className="bg-secondary p-4 rounded-lg">{user?.location}</div>
        </div>
      </div>
    </div>
  );
};

export default CommonProfile;
