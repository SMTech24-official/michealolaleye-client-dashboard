/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllUserQuery } from "@/redux/features/user/user.api";
import { Download } from "lucide-react";
import React from "react";
import { CSVLink } from "react-csv";

const DownloadList = () => {
  const { data } = useGetAllUserQuery([{ name: "limit", value: 9999999999 }]);

  const item: any = data?.data?.data;

  const csvHeaders = [
    { label: "ID", key: "id" },
    { label: "Full Name", key: "fullName" },
    { label: "Email", key: "email" },
    { label: "Phone Number", key: "phoneNumber" },
    { label: "Role", key: "role" },
    { label: "Status", key: "isDeleted" },
    { label: "Register Date", key: "createdAt" },
  ];

  const csvData =
    item?.map((user: any) => ({
      id: user.id,
      fullName: user.fullName,
      email: user.email || "NA",
      phoneNumber: user.phoneNumber || "NA",
      role: user.role,
      isDeleted: user.isDeleted ? "Blocked" : "Active",
      createdAt: new Date(user.createdAt).toLocaleString(),
    })) || [];

  return (
    <div>
      <CSVLink
        data={csvData}
        headers={csvHeaders}
        filename="user-list.csv"
        className="bg-primary text-white px-3 py-2 rounded-lg flex gap-2 items-center"
      >
        All User List ({item?.length}) <Download size={20} />
      </CSVLink>
    </div>
  );
};

export default DownloadList;
