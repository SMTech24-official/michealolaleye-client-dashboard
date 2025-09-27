"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { removeCookie } from "@/utils/cookies";
import {
  House,
  Book,
  BookHeadphones,
  ChartBarStacked,
  UserRound,
  Medal,
  Users,
  Images,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import logo from "@/assets/images/big-logo.png";
import Image from "next/image";

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
    icon: Images,
  },
  {
    title: "Category",
    url: "/category",
    icon: ChartBarStacked,
  },
  {
    title: "Rewards",
    url: "/rewards",
    icon: Medal,
  },
  {
    title: "User List",
    url: "/user-list",
    icon: Users,
  },
  {
    title: "Order List",
    url: "/order-list",
    icon: Users,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: UserRound,
  },
];

const AppSidebar = () => {
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLolgout = () => {
    dispatch(logout());
    removeCookie("token");
    router.push("/login");
  };

  return (
    <Sidebar className="!border-none">
      <SidebarContent className="!bg-secondary rounded-xl">
        <SidebarGroup />
        <SidebarGroupLabel className="mb-14 mt-8 mx-auto">
          <Image src={logo} alt="logo" width={100} height={50} />
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu className="px-4 space-y-1">
            {items?.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className={`text-base font-medium px-5 py-7 hover:bg-primary hover:text-white ${
                    pathName === `${item.url}`
                      ? "bg-primary text-white rounded-lg"
                      : "text-black"
                  }`}
                >
                  <Link href={item.url}>
                    <div>
                      <item.icon />
                    </div>
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <SidebarFooter>
            <button
              onClick={handleLolgout}
              className="py-3 border border-red-400 rounded-lg font-medium text-base"
            >
              Log out
            </button>
          </SidebarFooter>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
