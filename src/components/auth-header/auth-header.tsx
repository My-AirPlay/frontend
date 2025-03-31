"use client";
import CtaBtns from "@/app/(auth)/_components/cta-btn";

import logo from "@/app/assets/logo-big.svg";
import { Icon } from "@iconify/react";
import {
  ChevronDown,
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
const navLinks = ["About", "Features", "Pricing", "Royalties", "Support"];
const AuthHeader = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <header className="flex gap-7 sticky top-0 justify-between items-center mb-6">
      <Link href={"/"}>
        <Image alt="airplay" src={logo} />
      </Link>

      <nav
        className={cn(
          "  lg:relative fixed top-0 left-0 lg:w-auto lg:flex-row flex flex-col max-w-none w-svw lg:h-auto h-svh lg:bg-transparent bg-custom-mobile-nav z-50 flex-1 lg:translate-x-0 -translate-x-full transition-transform duration-200 ease-in-out lg:justify-center ",
          showMenu && "translate-x-0"
        )}
      >
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
        <ul className="flex flex-col lg:flex-row font-poppins flex-1 lg:flex-auto lg:w-fit  lg:px-0 px-4 lg:justify-between  lg:gap-4 gap-[31px] lg:max-w-[627px]">
          {navLinks.map((link) => (
            <li
              className="font-bold font-poppins text-white text-sm  items-center gap-3 flex justify-between lg:justify-start"
              key={link}
            >
              <Link href={"#"}>{link}</Link>
              <ChevronDown className="lg:block hidden" />
              <ChevronRight className="lg:hidden block" />
            </li>
          ))}
        </ul>
        <div className="lg:hidden block w-fit mx-auto">
          <CtaBtns />
        </div>
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
      </nav>
      <div className="hidden lg:block">
        <CtaBtns />
      </div>
      <Button
        className="bg-transparent hover:bg-transparent border  w-[31px] h-[31px] flex   border-custom-icon-btn-border rounded  text-white lg:hidden  "
        onClick={() => setShowMenu(true)}
      >
        <div>
          <Icon width={24} height={24} icon={"ci:menu-alt-05"} />
        </div>
      </Button>
    </header>
  );
};

export default AuthHeader;
