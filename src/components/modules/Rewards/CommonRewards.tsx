/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import DeleteModal from "@/components/common/DeleteModal";
import Spinner from "@/components/common/Spinner";
import {
  useGetPoinsQuery,
  useGetRedeemQuery,
} from "@/redux/features/outher/other.api";
import { Book } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SeletBookTypeModal from "../Dashboard/SeletBookTypeModal";

const CommonRewards = () => {
  const { data: point, isFetching } = useGetPoinsQuery(undefined);
  const { data: redeem, isFetching: redeemFetching } =
    useGetRedeemQuery(undefined);

  if (isFetching || redeemFetching) {
    return <Spinner />;
  }

  const pointData = point?.data;
  const redeemData = redeem?.data;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-14">Rewards</h2>
      <div className="grid grid-cols-2 gap-28">
        <div>
          <div className="flex justify-between gap-2 mb-6">
            <h2 className="text-xl">Earn Points!</h2>
            <Link href={"add-reward"}>
              <button className="bg-primary px-5 py-2 text-white rounded-lg">Add New</button>
            </Link>
          </div>
          <div className="space-y-6">
            {pointData.map((item: any) => (
              <div key={item.id} className="rounded-xl shadow-lg p-5 relative">
                <div className="flex items-center gap-3">
                  <div className="bg-secondary/50 p-3 rounded-full">
                    <Book />
                  </div>
                  <div>
                    <h3 className="font-medium">{item?.title}</h3>
                    <p className="text-gray-500">{item?.point} Points</p>
                  </div>
                </div>
                <div className="absolute top-0 right-0">
                  <DeleteModal btn="icon" type="point" id={item.id} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between gap-2 mb-6">
            <h2 className="text-xl">Reedeem redwards</h2>
            <SeletBookTypeModal />
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-5">
              {redeemData.map((item: any) => (
                <div
                  key={item.id}
                  className="rounded-xl shadow-lg p-3 relative bg-secondary"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={item?.book?.coverImage}
                      alt="image"
                      height={200}
                      width={150}
                      className="h-20 w-16 rounded-lg"
                    />
                    <div className="w-2/3">
                      <h3 className="text-lg ">
                        Use {item?.point} points to Read Book
                      </h3>
                    </div>
                  </div>

                  <div className="absolute top-0 right-0">
                    <DeleteModal btn="icon" type="redeem" id={item.id} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonRewards;
