import CtaBtns from "@/app/(auth)/_components/cta-btn";

import logo from "@/app/assets/logo-big.svg";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AuthHeader = () => {
  return (
    <div className="flex justify-between items-start mb-6">
      <nav className="w-full max-w-md ">
        <ul className="flex justify-between gap-4">
          <li className="font-medium text-white text-base">
            <Link href={"#"}>Features</Link>
          </li>
          <li className="font-medium text-white text-base">
            <Link href={"#"}>About Us</Link>
          </li>
          <li className="font-medium text-white text-base">
            <Link href={"#"}>Contact Us</Link>
          </li>
        </ul>
      </nav>
      <Link href={"/"}>
        <Image alt="airplay" src={logo} />
      </Link>
      <CtaBtns />
    </div>
  );
};

export default AuthHeader;
