"use client";
import logo from "../../assets/images/logo.png";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex justify-between mb-10 bg-secondary p-5 rounded-xl">
      <Image
        src={logo}
        alt="profile image"
        width={100}
        height={100}
        className="w-12 h-12 rounded-full"
      />
      <div className="flex gap-2 items-center">
        <Image
          src={logo}
          alt="profile image"
          width={100}
          height={100}
          className="w-9 h-9 rounded-full"
        />
        <div className="">
          <p className="text-gray-600 font-medium">Danielle Campbell </p>
          <p className="text-[12px]">Admin</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
