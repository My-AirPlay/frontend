"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import avatarImg from "@/app/assets/avatar.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ReactNode } from "react";

interface SettingProfileProps {
  children: ReactNode;
}
const SettingsProfile = ({ children }: SettingProfileProps) => {
  return (
    <section className="mt-[88px]">
      <h1 className="text-white mb-8 font-plus-jakarta-sans font-bold text-25 flex items-center gap-1">
        <div className="w-[30px] h-[30px] rounded-md text-[#c1c1c1] bg-black/20 grid place-items-center p-1">
          <Icon
            icon="material-symbols:settings-rounded"
            width="17.42"
            height="18.33"
          />
        </div>
        Settings
      </h1>
      <section className="flex justify-between flex-col md:flex-row items-center gap-8 mb-8">
        <figure>
          <Image
            src={avatarImg}
            alt=""
            className="max-w-[180px] w-full aspect-square rounded-full"
          />
        </figure>
        <Button variant={"profileBtn"}>Edit Profile</Button>
      </section>
      {children}
    </section>
  );
};

export default SettingsProfile;
