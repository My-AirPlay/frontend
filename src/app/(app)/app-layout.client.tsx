"use client";

import React, { ReactNode, useState } from "react";
import Sidebar from "./_components/sidebar/sidebar";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import ProfileDropdown from "@/components/profile-dropdown/profile-dropdown";
import { ChevronDown } from "lucide-react";
import LogoutBtn from "@/components/logout-btn/logout-btn";

interface AppLayoutClientProps {
  children: ReactNode;
}
const AppLayoutClient = ({ children }: AppLayoutClientProps) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="min-h-svh flex md:flex-row flex-col px-7 py-10  bg-custom-page-bg lg:gap-24 ">
      <Sidebar showMenu={showMenu} setShowMenu={setShowMenu} />
      <header className="md:hidden sticky mb-[88px] bg-custom-page-bg z-50 flex justify-between items-center">
        <Button
          className="bg-transparent hover:bg-transparent border  w-[31px] h-[31px] flex   border-custom-icon-btn-border rounded  text-white lg:hidden  "
          onClick={() => setShowMenu(true)}
        >
          <div>
            <Icon width={24} height={24} icon={"ci:menu-alt-05"} />
          </div>
        </Button>
        <div className="flex items-center">
          <small className="px-4 block w-fit py-[10px] font-inter font-medium text-white whitespace-nowrap">
            Hello User,
          </small>
          <ProfileDropdown />
        </div>
      </header>
      <main className="flex-1">
        <section
          className="hidden justify-between items-center sticky
        top-0 left-0 right-0 md:flex mb-20  bg-custom-page-bg z-50"
        >
          <div className="mid:flex hidden items-center gap-2 ">
            <h1 className="p-[10px] font-poppins font-bold text-custom-primary text-lg">
              Account Balance: $0.00
            </h1>
          </div>
          <div className="flex items-center gap-4 w-fit flex-1 justify-end">
            <small className="px-4 block w-fit py-[10px] font-inter font-medium text-white whitespace-nowrap">
              Hello User,
            </small>
            <ProfileDropdown />
            <div className=" md:block hidden">
              <LogoutBtn />
            </div>
            <Button className="text-white bg-transparent hover:bg-transparent flex gap-2 items-start">
              <Icon width={30} icon={"flagpack:gb-ukm"} />
              <ChevronDown size={24} />
            </Button>
          </div>
        </section>
        <section className="pb-10">{children}</section>
      </main>
    </div>
  );
};

export default AppLayoutClient;
