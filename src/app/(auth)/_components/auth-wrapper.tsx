import React, { ReactNode } from "react";
import logo from "@/app/assets/logo-big.svg";
import Image from "next/image";
interface AuthWrapperProps {
  children: ReactNode;
  title: string;
  subTitle: string;
}
const AuthWrapper = ({ children, subTitle, title }: AuthWrapperProps) => {
  return (
    <main className="flex py-28 min-h-svh container mx-auto ">
      <div className="flex-1">
        <figure className="mb-32">
          <Image src={logo} alt="airplay" />
        </figure>
        <h2 className="font-bold text-90 text-white mr-10">{title}</h2>
        <div className="flex items-center">
          <p className="w-fit px-6 py-4 border-4 border-white italic font-semibold text-white text-3xl">
            {subTitle}
          </p>
          <div className="border-t-[6px] border-t-custom-auth_stroke border-dashed flex-1 rounded-full" />
        </div>
      </div>
      <div className="shadow-auth-card flex flex-col w-full min-h-auth-card max-w-auth-card  bg-black/15 rounded-[20px]">
        <div className="px-10 pb-7 pt-24 flex-1 flex flex-col">{children}</div>
      </div>
    </main>
  );
};

export default AuthWrapper;
