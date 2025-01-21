"use client";

import { Icon } from "@iconify/react/dist/iconify.js";

import InputWrapper from "@/components/input-wrapper/input-wrapper";
import TextareaWrapper from "@/components/text-area-wrapper/text-area-wrapper";
import SettingsNav from "./_components/settings-nav/settings-nav";
import SettingsProfile from "./_components/settings-profile/settings-profile";
const SettingsClientPage = () => {
  return (
    <SettingsProfile>
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
    </SettingsProfile>
  );
};

export default SettingsClientPage;
