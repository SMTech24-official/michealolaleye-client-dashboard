/* eslint-disable @typescript-eslint/no-explicit-any */
import { useOrderListQuery } from "@/redux/features/user/user.api";
import { Download } from "lucide-react";
import React from "react";
import { CSVLink } from "react-csv";

const DownloadOrderList = () => {
  const { data } = useOrderListQuery([{ name: "limit", value: 9999999999 }]);

  const item: any = data?.data?.data;

  const csvHeaders = [
    { label: "Order ID", key: "orderId" },
    { label: "User", key: "user" },
    { label: "Book Name", key: "bookName" },
    { label: "Writer", key: "writerName" },
    { label: "Price", key: "price" },
    { label: "Date", key: "date" },
  ];

  const csvData =
    item?.map((order: any) => ({
      orderId: `#-${order.id.slice(-6)}`,
      user: order?.user?.fullName || "NA",
      bookName: order?.book?.bookName || "NA",
      writerName: order?.book?.writerName || "NA",
      price: `$${order?.book?.price ?? 0}`,
      date: new Date(order?.createdAt).toLocaleDateString(),
    })) || [];

  return (
    <div>
      <CSVLink
        data={csvData}
        headers={csvHeaders}
        filename="order-list.csv"
        className="bg-primary text-white px-3 py-2 rounded-lg flex gap-2 items-center"
      >
        Order List ({item?.length}) <Download size={20} />
      </CSVLink>
    </div>
  );
};

export default DownloadOrderList;
