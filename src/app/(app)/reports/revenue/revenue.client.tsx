"use client";
import React from "react";
import ReportPageWrapper from "../_components/reports-wrapper/reports-wrapper";
import { Button } from "@/components/ui/button";
import AnalyticsTableWrapper from "../../analytics/_component/analytics-table-wrapper";
import DateToggle from "../../analytics/_component/date-toggle";
import { Icon } from "@iconify/react/dist/iconify.js";
import RevenueChart from "../_components/revenue-chart/revenue-chart";
import RevenueLabel from "../_components/revenue-labels/revenue-label";

const RevenueClientPage = () => {
  return (
    <ReportPageWrapper>
      <div className="flex items-center gap-3 mb-16">
        <h2 className="p-[10px] text-white font-poppins font-semibold text-15">
          Revenue Breakdown
        </h2>
        <nav className="flex-1">
          <ul className="w-full max-w-fit border border-[#8B7777] rounded-[6px] py-1 px-2 flex">
            <li className="px-4 py-1 bg-custom-engagement-boder/5 rounded-[6px] w-fit text-white font-inter text-10 font-medium">
              <Button
                className="bg-transparent
                 hover:bg-transparent h-auto px-0 py-0"
              >
                All
              </Button>
            </li>
            <li className="px-4 py-1 rounded-[6px] w-fit text-custom-analytics-border font-inter text-10 font-medium">
              <Button
                className="bg-transparent
                 hover:bg-transparent h-auto px-0 py-0 text-inherit"
              >
                Annually
              </Button>
            </li>
            <li className="px-4 py-1 rounded-[6px] w-fit text-custom-analytics-border font-inter text-10 font-medium">
              <Button
                className="bg-transparent
                 hover:bg-transparent h-auto px-0 py-0 text-inherit"
              >
                Monthly
              </Button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex flex-col md:gap-24 gap-16 ">
        <AnalyticsTableWrapper
          leftEl={
            <div className="px-4 py-2 border border-white font-plus-jakarta-sans font-medium text-white rounded-lg">
              Anually
            </div>
          }
        >
          <div className="p-4 max-w-6xl mx-auto">
            <div className="flex md:justify-between md:items-center md:flex-row mb-10 flex-col gap-10">
              <DateToggle />

              <Button className="h-10 bg-custom-primary rounded-lg w-full max-w-fit flex items-center justify-center gap-2 hover:bg-custom-primary text-white">
                <Icon icon="bytesize:download" width="20" height="20" />
                Download
              </Button>
            </div>

            <div className="flex  gap-6 items-center  mx-auto ">
              <div className="flex-1 max-w-778 ">
                <div className="flex items-center w-full justify-between mb-10">
                  <h3 className="text-white font-inter font-semibold text-xl">
                    Annual
                  </h3>
                  <RevenueLabel highLabel="Highest" lowLabel="Lowest" />
                </div>
                <RevenueChart />
              </div>
              <div className="flex flex-col gap-5">
                <p className="font-inter text-custom-primary flex flex-col gap-2 font-semibold text-30">
                  $31,350
                  <span className="text-10 font-normal text-custom-engagement-boder">
                    Apple Music
                  </span>
                </p>
                <p className="font-inter text-custom-engagement-boder flex flex-col gap-2 font-semibold text-xl">
                  $16,800
                  <span className="text-10 font-normal text-custom-engagement-boder">
                    YouTube Music
                  </span>
                </p>
                <p className="font-inter text-custom-engagement-boder flex flex-col gap-2 font-semibold text-xl">
                  $15,070
                  <span className="text-10 font-normal text-custom-engagement-boder">
                    Spotify
                  </span>
                </p>
                <p className="font-inter text-custom-engagement-boder flex flex-col gap-2 font-semibold text-xl">
                  $13,621
                  <span className="text-10 font-normal text-custom-engagement-boder">
                    Soundcloud
                  </span>
                </p>
                <p className="font-inter text-custom-error flex flex-col gap-2 font-semibold text-xl">
                  $10,983
                  <span className="text-10 font-normal ">Deezer</span>
                </p>
              </div>
            </div>
          </div>
        </AnalyticsTableWrapper>
        <AnalyticsTableWrapper
          leftEl={
            <div className="px-4 py-2 border border-white font-plus-jakarta-sans font-medium text-white rounded-lg">
              Monthly
            </div>
          }
        >
          <div className="p-4 max-w-6xl mx-auto">
            <div className="flex md:justify-between md:items-center md:flex-row mb-10 flex-col gap-10">
              <DateToggle />

              <Button className="h-10 bg-custom-primary rounded-lg w-full max-w-fit flex items-center justify-center gap-2 hover:bg-custom-primary text-white">
                <Icon icon="bytesize:download" width="20" height="20" />
                Download
              </Button>
            </div>

            <div className="flex  gap-6 items-center  mx-auto ">
              <div className="flex-1 max-w-778 ">
                <div className="flex items-center w-full justify-between mb-10">
                  <h3 className="text-white font-inter font-semibold text-xl">
                    Annual
                  </h3>
                  <RevenueLabel highLabel="Highest" lowLabel="Lowest" />
                </div>
                <RevenueChart />
              </div>
              <div className="flex flex-col gap-5">
                <p className="font-inter text-custom-primary flex flex-col gap-2 font-semibold text-30">
                  $31,350
                  <span className="text-10 font-normal text-custom-engagement-boder">
                    Apple Music
                  </span>
                </p>
                <p className="font-inter text-custom-engagement-boder flex flex-col gap-2 font-semibold text-xl">
                  $16,800
                  <span className="text-10 font-normal text-custom-engagement-boder">
                    YouTube Music
                  </span>
                </p>
                <p className="font-inter text-custom-engagement-boder flex flex-col gap-2 font-semibold text-xl">
                  $15,070
                  <span className="text-10 font-normal text-custom-engagement-boder">
                    Spotify
                  </span>
                </p>
                <p className="font-inter text-custom-engagement-boder flex flex-col gap-2 font-semibold text-xl">
                  $13,621
                  <span className="text-10 font-normal text-custom-engagement-boder">
                    Soundcloud
                  </span>
                </p>
                <p className="font-inter text-custom-error flex flex-col gap-2 font-semibold text-xl">
                  $10,983
                  <span className="text-10 font-normal ">Deezer</span>
                </p>
              </div>
            </div>
          </div>
        </AnalyticsTableWrapper>
      </div>
    </ReportPageWrapper>
  );
};

export default RevenueClientPage;
