"use client";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { data } = useGetMeQuery(undefined);

  const user = data?.data;
  return (
    <div className="flex justify-between mb-10 bg-secondary p-5 rounded-xl">
      <h3 className="text-2xl font-bold">Dashboard</h3>
      <div className="flex gap-2 items-center">
        {user?.profileImage ? (
          <Image
            src={user?.profileImage}
            alt="profile image"
            width={100}
            height={100}
            className="w-9 h-9 rounded-full"
          />
        ) : (
          <FaRegUserCircle className="md:text-4xl text-2xl rounded-full" />
        )}
        <div className="">
          <p className="text-gray-600 font-medium">{user?.fullName}</p>
          <p className="text-[12px]">{user?.role}</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
