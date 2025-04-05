import React from "react";
import SettingsNav from "../_components/settings-nav/settings-nav";
import SettingsProfile from "../_components/settings-profile/settings-profile";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { urls } from "@/lib/constants";
import { Input } from "@/components/ui";

const SettingsPassword = () => {
  return (
    <SettingsProfile>
      <SettingsNav />
      <section className="flex flex-col gap-8 pb-8 mb-8 border-b border-b-custom-seperator">
        <h2 className="text-white mb-8 font-plus-jakarta-sans font-bold text-25 flex items-center gap-1">
          <div className="w-[30px] h-[30px] rounded-md text-[#c1c1c1] bg-black/20 grid place-items-center p-1">
            <Icon
              icon="material-symbols:settings-rounded"
              width="17.42"
              height="18.33"
            />
          </div>
          Password
        </h2>
        <div
          className="font-plus-jakarta-sans font-semibold text-white text-base"
          role="label"
        >
          Current Password
        </div>
        <Input type="password" defaultValue="random" disabled />
      </section>

      <Link href={urls.changePassword}>
        <Button size={"lg"}>
          Change Password <MoveRight />
        </Button>
      </Link>
    </SettingsProfile>
  );
};

export default SettingsPassword;
