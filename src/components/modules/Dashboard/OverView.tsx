"use client";
import Spinner from "@/components/common/Spinner";
import { useDashboardQuery } from "@/redux/features/book/book.api";
import { Book, BookHeadphones, DollarSign } from "lucide-react";

const OverView = () => {
  const { data, isFetching } = useDashboardQuery(undefined);

  if (isFetching) {
    return <Spinner />;
  }
  const overView = data?.data;
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-7">
      <div className="border border-[#FAE0FA] rounded-xl p-5 space-y-5">
        <div className="flex justify-between gap-1">
          <p className="text-xl">Total Ebook</p>
          <div className="bg-[#FAE0FA] p-3 rounded-xl">
            <Book />
          </div>
        </div>
        <h2 className="text-2xl font-bold"> {overView?.eBook}</h2>
        <div className="bg-primary h-2 rounded-full w-full"></div>
      </div>
      <div className="border border-[#FAE0FA] rounded-xl p-5 space-y-5">
        <div className="flex justify-between gap-1">
          <p className="text-xl">Total Audiobook</p>
          <div className="bg-[#FAE0FA] p-3 rounded-xl">
            <BookHeadphones />
          </div>
        </div>
        <h2 className="text-2xl font-bold"> {overView?.audiobook}</h2>
        <div className="bg-primary h-2 rounded-full w-full"></div>
      </div>
      <div className="border border-[#FAE0FA] rounded-xl p-5 space-y-5">
        <div className="flex justify-between gap-1">
          <p className="text-xl">Revenue</p>
          <div className="bg-[#FAE0FA] p-3 rounded-xl">
            <DollarSign />
          </div>
        </div>
        <h2 className="text-2xl font-bold">
          ${Number(overView?.total).toFixed(2)}
        </h2>
        <div className="bg-primary h-2 rounded-full w-full"></div>
      </div>
    </div>
  );
};

export default OverView;
