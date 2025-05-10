/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Spinner from "@/components/common/Spinner";
import DeleteModal from "@/components/common/DeleteModal";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import MyFormInput from "@/components/form/MyFormInput";
import { Search } from "lucide-react";
import { FieldValues } from "react-hook-form";
import { useState } from "react";
import { useGetAllUserQuery } from "@/redux/features/user/user.api";
import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";
import ChangePasswordModal from "@/components/modules/Auth/ChangePasswordModal";

const UserPage = () => {
  const [searchValue, setSearchValue] = useState<string | undefined>("");
  const { data, isFetching } = useGetAllUserQuery([
    { name: "searchTerm", value: searchValue },
  ]);

  const handleSubmit = (data: FieldValues) => {
    setSearchValue(data.search);
  };

  if (isFetching) {
    return <Spinner />;
  }

  const item: any = data?.data?.data;
  console.log(item);
  return (
    <div className="bg-[#FFF8FF80] p-4 rounded-lg">
      <div className="flex justify-between gap-1">
        <h2 className="text-2xl font-medium">User List</h2>

        <div className="flex gap-3">
          <MyFormWrapper onSubmit={handleSubmit}>
            <div className="relative">
              <MyFormInput name="search" inputClassName="px-12" />
              <button>
                <Search className="absolute top-3 left-2 " />
              </button>
            </div>
          </MyFormWrapper>

          <div className="inline-block">
            <button
              onClick={() => setSearchValue("")}
              className="bg-primary px-4 py-3 rounded-lg flex items-center gap-2 text-white"
            >
              All
            </button>
          </div>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xl font-medium text-black">
              Image
            </TableHead>
            <TableHead className="text-xl font-medium text-black">
              Name
            </TableHead>
            <TableHead className="text-xl font-medium text-black">
              Phone
            </TableHead>
            <TableHead className="text-xl font-medium text-black">
              Status
            </TableHead>
            <TableHead className="text-xl font-medium text-black text-end">
              Action
            </TableHead>
            <TableHead className="text-xl font-medium text-black text-end">
              Change Password
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {item?.map((item: any, idx: number) => (
            <TableRow key={idx} className="text-base ">
              <TableCell className="py-4">
                {item?.profileImage ? (
                  <Image
                    src={item?.profileImage}
                    alt="profile image"
                    width={100}
                    height={100}
                    className="w-9 h-9 rounded-full"
                  />
                ) : (
                  <FaRegUserCircle className="md:text-4xl text-2xl rounded-full" />
                )}
              </TableCell>
              <TableCell>{item?.fullName}</TableCell>
              <TableCell>{item?.phoneNumber}</TableCell>
              <TableCell
                className={`${
                  item?.isDeleted ? "text-red-500" : "text-green-500"
                } font-medium`}
              >
                {item?.isDeleted ? "Blocked" : "Active"}
              </TableCell>
              <TableCell className="flex justify-end">
                <DeleteModal
                  btn="text"
                  id={item?.id}
                  type="blockUser"
                  btnText={`${item?.isDeleted ? "Unblock" : "Block"}`}
                  message={`${item?.isDeleted ? "Unblock" : "Block"}`}
                />
              </TableCell>
              <TableCell>
                <div className="flex justify-end">
                  <ChangePasswordModal payload={item}/>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserPage;
