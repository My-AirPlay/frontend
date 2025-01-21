"use client";
import React from "react";
import SettingsProfile from "../_components/settings-profile/settings-profile";
import SettingsNav from "../_components/settings-nav/settings-nav";
import { Icon } from "@iconify/react/dist/iconify.js";
import InputWrapper from "@/components/input-wrapper/input-wrapper";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import CustomSelect from "@/components/custom-dropdown/custom-select";
import { currencyOptions, paymentOptions } from "@/lib/constants";
const EditBankClient = () => {
  const { back } = useRouter();
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
        <InputWrapper placeholder="090909090" />
        <div
          className="font-plus-jakarta-sans font-semibold text-white text-base"
          role="label"
        >
          Bank Name
        </div>
        <InputWrapper placeholder="First Bank" />
        <div
          className="font-plus-jakarta-sans font-semibold text-white text-base"
          role="label"
        >
          Account Name
        </div>
        <InputWrapper placeholder="Mary Rose" />
        <div
          className="font-plus-jakarta-sans font-semibold text-white text-base"
          role="label"
        >
          Sort Code
        </div>
        <InputWrapper placeholder="IBAN234" />
        <div
          className="font-plus-jakarta-sans font-semibold text-white text-base"
          role="label"
        >
          IBAN Swift Code
        </div>
        <InputWrapper placeholder="IBAN234" />
        <div
          className="font-plus-jakarta-sans font-semibold text-white text-base"
          role="label"
        >
          Payout Option
        </div>
        <CustomSelect options={paymentOptions} placeholder="Monthly" />
        <div
          className="font-plus-jakarta-sans font-semibold text-white text-base"
          role="label"
        >
          Currency
        </div>
        <CustomSelect options={currencyOptions} placeholder="₦ (Naira)" />
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
      </section>
    </SettingsProfile>
  );
};

export default EditBankClient;
