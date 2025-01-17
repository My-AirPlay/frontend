"use client";
import React from "react";
import logo from "@/app/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks, urls } from "@/lib/constants";
import SidebarItem from "../sidebar-item/sidebar-item";
import {
  ChevronDown,
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
interface SidebarProps {
  setShowMenu: (a: boolean) => void;
  showMenu: boolean;
}
const Sidebar = ({ setShowMenu, showMenu }: SidebarProps) => {
  const pathname = usePathname();
  return (
    <aside
      className={cn(
        " md:h-auto md:sticky fixed left-0 top-0 bottom-0 md:max-w-sidebar max-h-fit md:rounded-[30px]  bg-custom-sidebar flex flex-col justify-between gap-10 min-w-sidebar overflow-x-hidden overflow-y-auto w-full scroll-m-2 scrollbar-none overflow-hidden md:translate-x-0 -translate-x-full",
        showMenu && "translate-x-0"
      )}
    >
      <div className="relative hidden md:block ">
        <Link
          className="w-fit py-4 hidden sticky md:block top-0 left-0 right-0 px-4 mx-auto z-[9999] bg-custom-sidebar"
          href={urls.dashboard}
        >
          <Image src={logo} alt="airplay" />
        </Link>
        <nav className="">
          <ul className="md:flex hidden pl-4 flex-col gap-[50px] ">
            {sidebarLinks.map((sidebarLink) => (
              <SidebarItem key={sidebarLink.title} {...sidebarLink} />
            ))}
          </ul>
        </nav>
      </div>
      <div className="h-svh w-full md:hidden flex flex-col">
        <div className="lg:hidden flex justify-between pl-4 pr-3 pt-7 mb-9">
          <Button
            className="text-white bg-transparent hover:bg-transparent"
            onClick={() => setShowMenu(false)}
          >
            <Icon width={24} icon={"lucide:x"} />
          </Button>
          <Button className="text-white bg-transparent hover:bg-transparent flex gap-2 items-start">
            <Icon width={30} icon={"flagpack:gb-ukm"} />
            <ChevronDown size={24} />
          </Button>
        </div>
        <ul className="flex-1 px-4 flex-col gap-[31px]  flex w-full mx-auto">
          {sidebarLinks.map((link) => (
            <li key={link.title}>
              <Link
                href={link.route || "#"}
                className={cn(
                  "flex justify-between items-center font-roboto font-medium text-[17px] text-custom-registration_link",
                  link.route && pathname.includes(link.route) && "text-white"
                )}
                onClick={() => setShowMenu(false)}
              >
                <small>{link.title}</small>
                <ChevronRight size={24} />
              </Link>
            </li>
          ))}
        </ul>
        <div className="pb-2 mt-10 h-14 pt-4 border-t border-t-custom-footer_border lg:hidden block">
          <ul className="flex justify-center items-center text-white/30  gap-10">
            <li>
              <Link href={"#"}>
                <Twitter />
              </Link>
            </li>
            <li>
              <Link href={"#"}>
                <Linkedin />
              </Link>
            </li>
            <li>
              <Link href={"#"}>
                <Instagram />
              </Link>
            </li>
            <li>
              <Link href={"#"}>
                <Facebook />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
