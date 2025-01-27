"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import AnalyticsWrapper from "../_component/analytics-wrapper";

import EarningTable from "./_component/earning-table/earning-table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CustomSelect from "@/components/custom-dropdown/custom-select";
import EarningMobileTable from "./_component/earning-table-mobile/earning-table-mobile";
const EarningClient = () => {
  return (
    <AnalyticsWrapper>
      <h2 className="text-white font-plus-jakarta-sans font-extrabold text-xl mb-16">
        Earnings Breakdown
      </h2>

      <section className="bg-custom-analytics-table rounded-[16px] py-2    ">
        <div className="flex items-center gap-2 pb-2 border-b border-b-custom-input_dark  px-6 mb-5">
          <Icon
            icon="lsicon:drag-filled"
            width="24"
            height="24"
            color="#F1F1F1"
          />
          <div className="flex flex-col">
            <small className="font-plus-jakarta-sans font-semibold text-xl text-white">
              Period
            </small>
            <small className="font-plus-jakarta-sans font-normal text-sm text-custom-engagement-boder">
              Oct to Dec 2024
            </small>
          </div>
        </div>
        <div className="flex justify-center items-center md:gap-10 gap-3 mb-5">
          <Button className="border-white bg-transparent hover:bg-transparent border max-w-8 aspect-square p-0  md:p-2 text-custom-engagement-boder">
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button className="bg-transparent hover:bg-transparent hover:text-cus  w-fit p-2 text-custom-engagement-boder font-inter font-normal text-sm">
            2021
          </Button>
          <Button className="bg-transparent hover:bg-transparent hover:text-cus  w-fit p-2 text-custom-engagement-boder font-inter font-normal text-sm">
            2024
          </Button>
          <Button className="bg-transparent hover:bg-transparent hover:text-cus  w-fit p-2 text-custom-engagement-boder font-inter font-normal text-sm">
            2023
          </Button>
          <Button className="bg-transparent hover:bg-transparent hover:text-cus  w-fit p-2 text-custom-primary font-inter font-normal text-sm">
            2024
          </Button>
          <Button className="border-white bg-transparent hover:bg-transparent border  w-fit p-2 text-custom-engagement-boder">
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
        <EarningTable />
        <EarningMobileTable />
        <div className="mt-10 px-8 flex justify-between flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-5">
            <Button className="border-white bg-transparent hover:bg-transparent border  w-fit p-2 text-custom-engagement-boder">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <small className="font-inter text-white font-normal text-base">
              1 <span className="text-custom-primary">/ 16</span>
            </small>
            <Button className="border-white bg-transparent hover:bg-transparent border  w-fit p-2 text-custom-engagement-boder">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex gap-3 items-center ">
            <small className="font-plus-jakarta-sans text-white font-normal text-xs whitespace-nowrap">
              Rows per page
            </small>
            <CustomSelect
              options={[
                {
                  label: "10",
                  value: "10",
                },
              ]}
              placeholder="10"
              styles="h-10 max-w-[100px] w-full"
            />
          </div>
        </div>
      </section>
    </AnalyticsWrapper>
  );
};

export default EarningClient;
