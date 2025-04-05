import React from "react";
import SettingsNav from "../_components/settings-nav/settings-nav";
import SettingsProfile from "../_components/settings-profile/settings-profile";
import { Icon } from "@iconify/react/dist/iconify.js";
import InputWrapper from "@/components/input-wrapper/input-wrapper";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { urls } from "@/lib/constants";

const SettingsBank = () => {
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
          Bank Details
        </h2>
        <div
          className="font-plus-jakarta-sans font-semibold text-white text-base"
          role="label"
        >
          Account Number
        </div>
        <InputWrapper disabled placeholder="090909090" />
        <div
          className="font-plus-jakarta-sans font-semibold text-white text-base"
          role="label"
        >
          Bank Name
        </div>
        <InputWrapper disabled placeholder="First Bank" />
        <div
          className="font-plus-jakarta-sans font-semibold text-white text-base"
          role="label"
        >
          Account Name
        </div>
        <InputWrapper disabled placeholder="Mary Rose" />
        <div
          className="font-plus-jakarta-sans font-semibold text-white text-base"
          role="label"
        >
          Sort Code
        </div>
        <InputWrapper disabled placeholder="IBAN234" />
        <div
          className="font-plus-jakarta-sans font-semibold text-white text-base"
          role="label"
        >
          IBAN Swift Code
        </div>
        <InputWrapper disabled placeholder="IBAN234" />
        <div
          className="font-plus-jakarta-sans font-semibold text-white text-base"
          role="label"
        >
          Payout Option
        </div>
        <InputWrapper disabled placeholder="Monthly" />
        <div
          className="font-plus-jakarta-sans font-semibold text-white text-base"
          role="label"
        >
          Currency
        </div>
        <InputWrapper disabled placeholder="₦ (Naira)" />
      </section>

      <Link href={urls.editBank}>
        <Button size={"lg"}>
          Edit Bank Details <MoveRight />
        </Button>
      </Link>
    </SettingsProfile>
  );
};

export default SettingsBank;
