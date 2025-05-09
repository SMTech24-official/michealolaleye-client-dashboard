import MyBtn from "@/components/common/MyBtn";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SeletBookTypeModal = () => {
  const pathName = usePathname();

  return (
    <div>
      <Dialog>
        <DialogTrigger className="bg-primary px-5 py-2 text-white rounded-lg">
          Add new
        </DialogTrigger>
        <DialogContent className="max-w-[600px] p-12">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl my-4">
              Add Recommended book
            </DialogTitle>
            <DialogDescription className="flex flex-col gap-5">
              <Link
                href={
                  pathName === "/rewards"
                    ? {
                        pathname: "/select-book",
                        query: { type: "EBOOK", from: "rewards" },
                      }
                    : { pathname: "/select-book", query: { type: "EBOOK" } }
                }
              >
                <MyBtn name="Ebook" width="w-full" />
              </Link>
              <Link
                href={
                  pathName === "/rewards"
                    ? {
                        pathname: "/select-book",
                        query: { type: "AUDIOBOOK", from: "rewards" },
                      }
                    : {
                        pathname: "/select-book",
                        query: { type: "AUDIOBOOK" },
                      }
                }
              >
                <MyBtn name="Audio Bbook" width="w-full" />
              </Link>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SeletBookTypeModal;
