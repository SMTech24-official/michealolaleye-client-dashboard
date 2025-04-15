"use client";
import MyBtn from "@/components/common/MyBtn";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { useState } from "react";
import { FieldValues } from "react-hook-form";

const SelectBookTable = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const item = [1, 2, 3, 4];

  const handleSubmit = (data: FieldValues) => {
    console.log(data);
  };

  // Handle individual truck selection
  const handleSelectTruck = (id: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((truckId) => truckId !== id));
    }
  };

  //   useEffect(() => {
  //     onSelectionChange?.(selectedIds);
  //   }, [selectedIds, onSelectionChange]);

  return (
    <div className="bg-[#FFF8FF80] p-4 rounded-lg">
      <div className="flex justify-between gap-1">
        <h2 className="text-2xl font-medium">Ebook</h2>

        <div>
          <MyFormWrapper onSubmit={handleSubmit}>
            <div className="relative">
              <MyFormInput name="search" inputClassName="px-12" />
              <button>
                <Search className="absolute top-3 left-2 " />
              </button>
            </div>
          </MyFormWrapper>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xl font-medium text-black">
              Tittle
            </TableHead>
            <TableHead className="text-xl font-medium text-black">
              Writter
            </TableHead>
            <TableHead className="text-xl font-medium text-black">
              Category
            </TableHead>
            <TableHead className=" text-xl font-medium text-black">
              Sale
            </TableHead>
            <TableHead className=" text-xl font-medium text-black">
              Length
            </TableHead>
            <TableHead className=" text-xl font-medium text-black">
              Edit
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {item.map((item, idx) => (
            <TableRow key={idx} className="text-base ">
              <TableCell className="py-4">Soler bones & stardom</TableCell>
              <TableCell>Mike cormac & startac</TableCell>
              <TableCell>Story</TableCell>
              <TableCell>12</TableCell>
              <TableCell>2hrs 20min</TableCell>
              <TableCell>
                <Checkbox
                  id={`select-${item.id}`}
                  checked={selectedIds.includes(item.id)}
                  onCheckedChange={(checked) =>
                    handleSelectTruck(item.id, checked === true)
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="max-w-96 mx-auto my-7 space-y-4">
        <MyBtn name="Save" width="w-full"/>
        <button className="border border-primary w-full rounded-lg py-2 text-primary">Cancel</button>
      </div>
    </div>
  );
};

export default SelectBookTable;
