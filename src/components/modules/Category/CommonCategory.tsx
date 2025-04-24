/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import DeleteModal from "@/components/common/DeleteModal";
import MyBtn from "@/components/common/MyBtn";
import Spinner from "@/components/common/Spinner";
import { useGetAllCategoryQuery } from "@/redux/features/outher/other.api";
import Image from "next/image";
import Link from "next/link";

const CommonCategory = () => {
  const { data, isFetching } = useGetAllCategoryQuery(undefined);

  if (isFetching) {
    return <Spinner />;
  }

  const bannerData = data?.data;
  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-14">Category</h2>
      <div className="grid grid-cols-7 gap-6">
        {bannerData.map((item: any) => (
          <div key={item.id} className="rounded-xl shadow-lg p-2 relative">
            <div className="flex flex-col items-center gap-3">
              <Image
                src={item.image}
                alt="image"
                height={300}
                width={250}
                className="h-36 w-32"
              />
              <h3 className="text-xl ">{item?.name}</h3>
            </div>

            <div className="absolute top-0 right-0">
              <DeleteModal btn="icon" type="category" id={item.id} />
            </div>
          </div>
        ))}
      </div>

      <div className="w-2/3 mx-auto mt-16">
        <Link href={"/add-category"}>
          <MyBtn name="Add new" width="w-full" />
        </Link>
      </div>
    </div>
  );
};

export default CommonCategory;
