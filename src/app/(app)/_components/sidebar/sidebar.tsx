"use client";
import React from "react";
import logo from "@/app/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks, urls } from "@/lib/constants";
import SidebarItem from "../sidebar-item/sidebar-item";
const Sidebar = () => {
  return (
    <aside className=" max-h-svh sticky left-0 top-0 bottom-0 max-w-sidebar rounded-[30px]  bg-custom-sidebar flex flex-col justify-between gap-10 min-w-sidebar overflow-x-hidden overflow-y-auto w-full scroll-m-2 scrollbar-none overflow-hidden">
      <div className="relative ">
        <Link
          className="w-fit py-4 block sticky top-0 left-0 right-0 px-4 mx-auto z-[9999] bg-custom-sidebar"
          href={urls.dashboard}
        >
          <Image src={logo} alt="airplay" />
        </Link>
        <nav>
          <ul className="flex pl-4 flex-col gap-[50px]">
            {sidebarLinks.map((sidebarLink) => (
              <SidebarItem key={sidebarLink.title} {...sidebarLink} />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
