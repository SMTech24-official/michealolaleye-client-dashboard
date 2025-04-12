"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Image,
  House,
  Book,
  BookHeadphones,
  ChartBarStacked,
  UserRound,
} from "lucide-react";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: House,
  },
  {
    title: "Ebook",
    url: "/ebook",
    icon: Book,
  },
  {
    title: "Audiobook",
    url: "/audiobook",
    icon: BookHeadphones,
  },
  {
    title: "Banner",
    url: "/banner",
    icon: Image,
  },
  {
    title: "Category",
    url: "/category",
    icon: ChartBarStacked,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: UserRound,
  },
];

const AppSidebar = () => {
  const pathName = usePathname();
  return (
    <Sidebar className="top-36 left-7 !border-none">
      <SidebarContent className="!bg-secondary rounded-xl">
        <SidebarGroup />

        <SidebarGroupContent>
          <SidebarMenu className="px-4 space-y-1">
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className={`text-base font-medium px-5 py-7 hover:bg-primary hover:text-white ${
                    pathName === `${item.url}`
                      ? "bg-primary text-white rounded-xl"
                      : "text-black"
                  }`}
                >
                  <a href={item.url}>
                    <div>
                      <item.icon />
                    </div>
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
