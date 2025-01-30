"use client";
import InputWrapper from "@/components/input-wrapper/input-wrapper";
import TextareaWrapper from "@/components/text-area-wrapper/text-area-wrapper";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import React from "react";
import avatarImg from "@/app/assets/avatar.png";
import SettingsNav from "../_components/settings-nav/settings-nav";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

const EditProfileClient = () => {
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
      <section className="flex  flex-col md:flex-row items-center gap-8  mb-8">
        <figure>
          <Image
            src={avatarImg}
            alt=""
            className="max-w-[180px] w-full aspect-square rounded-full"
          />
        </figure>

        <Button
          variant={"profileBtn"}
          className="bg-transparent border border-white"
        >
          Delete Image
        </Button>
        <Button variant={"profileBtn"}>Upload Profile</Button>
      </section>
      <SettingsNav />
      <section className="flex flex-col md:gap-9 gap-5 pb-9 mb-9 border-b border-b-[#393939] max-w-profile">
        <h2 className="text-white mb-8 font-plus-jakarta-sans font-bold text-25 flex items-center gap-1">
          <div className="w-[30px] h-[30px] rounded-md text-[#c1c1c1] bg-black/20 grid place-items-center p-1">
            <Icon
              icon="material-symbols:settings-rounded"
              width="17.42"
              height="18.33"
            />
          </div>
          Basic Information
        </h2>
        <fieldset className="flex flex-col md:gap-9 gap-5">
          <div
            className="font-plus-jakarta-sans font-semibold text-white text-base"
            role="label"
          >
            Full Name
          </div>
          <InputWrapper disabled placeholder="Mary Rose" className="" />
        </fieldset>
        <fieldset className="flex flex-col md:gap-9 gap-5">
          <div
            className="font-plus-jakarta-sans font-semibold text-white text-base"
            role="label"
          >
            Stage Name
          </div>
          <InputWrapper disabled placeholder="Rose" className="" />
        </fieldset>
        <fieldset className="flex flex-col md:gap-9 gap-5">
          <div
            className="font-plus-jakarta-sans font-semibold text-white text-base"
            role="label"
          >
            Phone Number
          </div>
          <InputWrapper disabled placeholder="+234567890" className="" />
        </fieldset>
        <fieldset className="flex flex-col md:gap-9 gap-5">
          <div
            className="font-plus-jakarta-sans font-semibold text-white text-base"
            role="label"
          >
            Email Address
          </div>
          <InputWrapper
            disabled
            placeholder="maryrose@gmail.com"
            className=""
          />
        </fieldset>
        <fieldset className="flex flex-col md:gap-9 gap-5">
          <div
            className="font-plus-jakarta-sans font-semibold text-white text-base"
            role="label"
          >
            Tell us a bit about yourself (Biography)
          </div>
          <TextareaWrapper
            disabled
            placeholder="A very shy person"
            className=""
          />
        </fieldset>
      </section>
      <section className="max-w-profile">
        <h2 className="text-white font-plus-jakarta-sans font-bold text-25 flex items-center gap-1 mb-9">
          <div className="w-[30px] h-[30px] rounded-md text-[#c1c1c1] bg-black/20 grid place-items-center p-1 ">
            <Icon
              icon="material-symbols:settings-rounded"
              width="17.42"
              height="18.33"
            />
          </div>
          Social Media Links
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-9 ">
          <InputWrapper disabled placeholder="Instagram" className="" />
          <InputWrapper disabled placeholder="Soundcloud" className="" />
          <InputWrapper disabled placeholder="TikTok" className="" />
          <InputWrapper
            disabled
            placeholder="X (formally Twitter)"
            className=""
          />
          <InputWrapper disabled placeholder="Facebook" className="" />
          <InputWrapper disabled placeholder="Website" className="" />
        </div>
      </section>
      <div className="flex gap-9 mt-9">
        <Button
          variant={"profileBtn"}
          className="bg-transparent border border-white"
        >
          Cancel
        </Button>
        <Button variant={"profileBtn"} className="flex items-center gap-2">
          Apply Changes <MoveRight width={24} />
        </Button>
      </div>
    </section>
  );
};

export default EditProfileClient;
