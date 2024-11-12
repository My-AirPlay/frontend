import { ArrowLeft, Earth, LifeBuoy } from "lucide-react";
import { Metadata } from "next";
import React from "react";
import RoleCard from "../_components/role-card";
import bg from "@/app/(auth)/_assets/auth.png";
import Image from "next/image";
export const metadata: Metadata = {
  title: "Login",
};
const RoleLogin = () => {
  return (
    <main className="grid grid-cols-2 min-h-svh ">
      <section className="h-full sticky top-0 bottom-0 left-0">
        <Image src={bg} alt="" className="h-svh object-cover object-center" />
      </section>
      <section className="bg-black w-full h-full flex flex-col px-5 py-3">
        <button className="text-white">
          <ArrowLeft />
        </button>
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-custom-primary font-semibold text-2xl mb-6">
            Sign up/Log in
          </h1>
          <div className="w-full max-w-md flex flex-col gap-3">
            <RoleCard
              title="For Artists"
              description="Make money and track your royalty"
            />
            <RoleCard
              title="For Admin"
              description="Manage and grow your Artists"
            />
          </div>
        </div>

        <div className="flex justify-center items-center gap-6">
          <button className="text-custom-primary flex items-center gap-1 ">
            <Earth />
            <span className="font-medium text-sm">English</span>
          </button>
          <button className="text-custom-primary flex items-center gap-1 ">
            <LifeBuoy />
            <span className="font-medium text-sm">Support</span>
          </button>
        </div>
      </section>
    </main>
  );
};

export default RoleLogin;
