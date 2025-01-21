"use client";
import React from "react";
import SettingsProfile from "../_components/settings-profile/settings-profile";
import SettingsNav from "../_components/settings-nav/settings-nav";
import { Icon } from "@iconify/react/dist/iconify.js";
import PasswordInput from "@/app/(auth)/_components/password-input/password-input";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";

const EditPasswordClient = () => {
  const { back } = useRouter();
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) =>
    e.preventDefault();
  return (
    <SettingsProfile>
      <SettingsNav />
      <form onSubmit={onSubmit} className="flex flex-col gap-8 pb-8 mb-8 ">
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
        <PasswordInput defaultValue="random" />
        <div
          className="font-plus-jakarta-sans font-semibold text-white text-base"
          role="label"
        >
          New Password
        </div>
        <PasswordInput defaultValue="random" />
        <div
          className="font-plus-jakarta-sans font-semibold text-white text-base"
          role="label"
        >
          Confirm New Password
        </div>
        <PasswordInput defaultValue="random" />
        <div className="border-t border-custom-seperator" />
        <div className="flex gap-9 flex-col md:flex-row">
          <Button
            type="button"
            variant={"authBtn"}
            className="bg-transparent border-white border"
            onClick={back}
          >
            Cancel
          </Button>
          <Button type="submit" variant={"authBtn"}>
            Apply Changes <MoveRight />
          </Button>
        </div>
      </form>
    </SettingsProfile>
  );
};

export default EditPasswordClient;
