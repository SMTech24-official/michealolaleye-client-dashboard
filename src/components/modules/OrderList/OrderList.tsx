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
import { useState } from "react";
import { useOrderListQuery } from "@/redux/features/user/user.api";
import Pagination from "@/components/common/Pagination";
import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";
import DownloadOrderList from "./DownloadOrderList";

const OrderList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isFetching } = useOrderListQuery([
    { name: "limit", value: 20 },
    { name: "page", value: String(currentPage) },
  ]);

  if (isFetching) {
    return <Spinner />;
  }

  const item: any = data?.data?.data;
  const metaData = data?.data?.meta;

  return (
    <div className="bg-[#FFF8FF80] p-4 rounded-lg">
      <div className="flex justify-between gap-1 mb-6">
        <h2 className="text-2xl font-medium">Order List</h2>
      </div>

      {item?.length < 1 ? (
        <p className="text-center font-semibold text-xl text-primary">
          No Data Found
        </p>
      ) : (
        <div className="space-y-6">
          <div className="inline-block">
            <DownloadOrderList />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xl font-medium text-black">
                  User
                </TableHead>
                <TableHead className="text-xl font-medium text-black">
                  Order ID
                </TableHead>
                <TableHead className="text-xl font-medium text-black">
                  Book Name
                </TableHead>
                <TableHead className="text-xl font-medium text-black">
                  Writer
                </TableHead>
                <TableHead className="text-xl font-medium text-black">
                  Price
                </TableHead>
                <TableHead className="text-xl font-medium text-black">
                  Date
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {item?.map((order: any) => (
                <TableRow key={order.id} className="text-base">
                  <TableCell className="flex items-center gap-2 py-4">
                    {order?.user?.profileImage ? (
                      <Image
                        src={order?.user?.profileImage}
                        alt="profile image"
                        width={36}
                        height={36}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    ) : (
                      <FaRegUserCircle className="md:text-4xl text-2xl rounded-full" />
                    )}
                    <span>{order?.user?.fullName}</span>
                  </TableCell>
                  <TableCell>#-{order.id.slice(-6)}</TableCell>
                  <TableCell>{order?.book?.bookName}</TableCell>
                  <TableCell>{order?.book?.writerName}</TableCell>
                  <TableCell>${order?.book?.price}</TableCell>
                  <TableCell>
                    {new Date(order?.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Pagination
        currentPage={metaData?.page}
        totalItem={metaData?.total}
        limit={20}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default OrderList;
