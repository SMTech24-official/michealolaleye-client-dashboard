/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import DeleteModal from "@/components/common/DeleteModal";
import MyBtn from "@/components/common/MyBtn";
import Spinner from "@/components/common/Spinner";
import { useGetAllBannerQuery } from "@/redux/features/outher/other.api";
import Image from "next/image";
import Link from "next/link";

const CommonBanner = () => {
  const { data, isFetching } = useGetAllBannerQuery(undefined);

  if (isFetching) {
    return <Spinner />;
  }

  const bannerData = data?.data;
  console.log(data);
  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-14">Banner</h2>
      <div className="grid grid-cols-3 gap-6">
        {bannerData?.map((item: any) => (
          <div key={item.id} className="rounded-xl shadow-lg p-5 relative">
            <div className="flex items-center">
              <div className="w-2/3">
                <h3 className="text-xl font-semibold">{item?.title}</h3>
                <p className="text-gray-500">{item?.creator}</p>
              </div>
              <Image
                src={item.image}
                alt="image"
                height={300}
                width={250}
                className="h-36 w-32"
              />
            </div>

            <div className="absolute top-0 right-0">
              <DeleteModal btn="icon" type="banner" id={item.id} />
            </div>
          </div>
        ))}
      </div>

      <div className="w-2/3 mx-auto mt-16">
        <Link href={"/add-banner"}>
          <MyBtn name="Add new" width="w-full" />
        </Link>
      </div>
    </div>
  );
};

export default CommonBanner;
