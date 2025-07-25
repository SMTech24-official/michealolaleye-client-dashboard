import { Metadata } from "next";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/shared/AppSidebar";
import Navbar from "@/components/shared/Navbar";

export const metadata: Metadata = {
  title: "MFM EBOOKS"
};

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="p-7">
      <SidebarProvider>
        <AppSidebar />
      
        <div className="max-w-[1450px] px-5 mx-auto w-full"><Navbar />{children}</div>
      </SidebarProvider>
    </main>
  );
};

export default CommonLayout;
