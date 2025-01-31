"use client";
import React from "react";
import ReportPageWrapper from "./_components/reports-wrapper/reports-wrapper";
import { Icon } from "@iconify/react/dist/iconify.js";
import DemographicLocationPieChart from "./_components/demographics-charts/location-pie-chart/location-pie-chart";
import GenderPieChart from "./_components/demographics-charts/gender-pie-chart/gender-pie-chart";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DateToggle from "../analytics/_component/date-toggle";

import RevenueCard from "./_components/revenue-card/revenue-card";

const ReportsPageClient = () => {
  return (
    <ReportPageWrapper>
      <h2 className="font-plus-jakarta-sans font-extrabold text-white text-xl mb-5">
        Demographics{" "}
      </h2>
      <section className="flex flex-col lg:flex-row  gap-10 mb-10">
        <article className="w-full max-w-[330px] bg-white/[2%] p-5 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 w-full">
              <div className="max-w-12 aspect-square w-full text-white bg-custom-input_dark rounded grid place-items-center">
                <Icon icon={"fa-solid:coins"} width={30} height={30} />
              </div>
              <div className="flex flex-col">
                <small className="text-custom-icon-btn-border font-inter font-medium text-10">
                  Location Overview
                </small>
                <small className="text-white font-poppins text-base font-semibold">
                  3
                </small>
              </div>
            </div>
            <Icon icon="ri:more-line" width="24" height="24" color="#D9D9D9" />
          </div>
          <p className="text-custom-analytics-border font-plus-jakarta-sans font-medium text-10 mb-4">
            Your location overview is across over 3 countries
          </p>
          <div className="flex items-center gap-8">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-2 rounded-lg bg-[#292A3D]" />
                <small className="font-plus-jakarta-sans text-white font-bold text-10">
                  62%{" "}
                  <span className="font-medium text-custom-footer_border">
                    Canada
                  </span>
                </small>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-2 rounded-lg bg-[#292A3D]" />
                <small className="font-plus-jakarta-sans text-white font-bold text-10">
                  13%{" "}
                  <span className="font-medium text-custom-footer_border">
                    USA
                  </span>
                </small>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-2 rounded-lg bg-[#292A3D]" />
                <small className="font-plus-jakarta-sans text-white font-bold text-10">
                  23%{" "}
                  <span className="font-medium text-custom-footer_border">
                    Nigeria
                  </span>
                </small>
              </div>
            </div>
            <DemographicLocationPieChart />
          </div>
        </article>
        <article className="w-full max-w-[330px] bg-white/[2%] p-5 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 w-full">
              <div className="max-w-12 aspect-square w-full text-white bg-custom-input_dark rounded grid place-items-center">
                <Icon icon={"fa-solid:coins"} width={30} height={30} />
              </div>
              <div className="flex flex-col">
                <small className="text-custom-icon-btn-border font-inter font-medium text-10">
                  Gender Distribution
                </small>
                <small className="text-white font-poppins text-base font-semibold">
                  1,302
                </small>
              </div>
            </div>
            <Icon icon="ri:more-line" width="24" height="24" color="#D9D9D9" />
          </div>
          <p className="text-custom-analytics-border font-plus-jakarta-sans font-medium text-10 mb-4">
            You have 1,302 people who are vibing to your music
          </p>
          <div className="flex items-center gap-8">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-2 rounded-lg bg-[#292A3D]" />
                <small className="font-plus-jakarta-sans text-white font-bold text-10">
                  62%{" "}
                  <span className="font-medium text-custom-footer_border">
                    Male
                  </span>
                </small>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-2 rounded-lg bg-[#292A3D]" />
                <small className="font-plus-jakarta-sans text-white font-bold text-10">
                  32%{" "}
                  <span className="font-medium text-custom-footer_border">
                    Female
                  </span>
                </small>
              </div>
            </div>
            <GenderPieChart />
          </div>
        </article>
        <article className="w-full max-w-[330px]">
          <h2 className="font-plus-jakarta-sans text-custom-analytics-border font-medium text-xs mb-3">
            Age Range
          </h2>
          <div className="grid grid-cols-2 gap-5 mb-5">
            <div className="w-full max-w-[168px] p-4 border bg-custom-age-range-border min-h-20 rounded-[20px] border-custom-analytics-border flex flex-col gap-3">
              <h3 className="text-white font-plus-jakarta-sans font-medium text-sm">
                18 - 30 years
              </h3>
              <small className="font-bold font-plus-jakarta-sans text-2xl text-white">
                14%
              </small>
            </div>
            <div className="w-full max-w-[168px] p-4 border bg-custom-age-range-border min-h-20 rounded-[20px] border-custom-analytics-border flex flex-col gap-3">
              <h3 className="text-white font-plus-jakarta-sans font-medium text-sm">
                18 - 30 years
              </h3>
              <small className="font-bold font-plus-jakarta-sans text-2xl text-white">
                14%
              </small>
            </div>
            <div className="w-full max-w-[168px] p-4 border bg-custom-age-range-border min-h-20 rounded-[20px] border-custom-analytics-border flex flex-col gap-3">
              <h3 className="text-white font-plus-jakarta-sans font-medium text-sm">
                18 - 30 years
              </h3>
              <small className="font-bold font-plus-jakarta-sans text-2xl text-white">
                14%
              </small>
            </div>
            <div className="w-full max-w-[168px] p-4 border bg-custom-age-range-border min-h-20 rounded-[20px] border-custom-analytics-border flex flex-col gap-3">
              <h3 className="text-white font-plus-jakarta-sans font-medium text-sm">
                18 - 30 years
              </h3>
              <small className="font-bold font-plus-jakarta-sans text-2xl text-white">
                14%
              </small>
            </div>
          </div>
          <Link
            href={"#"}
            className="text-custom-primary font-plus-jakarta-sans font-medium text-sm"
          >
            View all demographics data
          </Link>
        </article>
      </section>

      <section className="w-full bg-custom-analytics-white min-h-[66px] rounded-lg px-6 py-3 flex items-center flex-col md:flex-row gap-5 justify-between mb-10">
        <div className="flex items-center gap-3">
          <h2 className="p-[10px] text-white font-poppins font-semibold text-15">
            Revenue Comparism
          </h2>
          <nav className="flex-1">
            <ul className="w-full max-w-fit border border-[#8B7777] rounded-[6px] py-1 px-2 flex">
              <li className="px-4 py-1 bg-custom-engagement-boder/5 rounded-[6px] w-fit text-white font-inter text-10 font-medium">
                <Button
                  className="bg-transparent
                 hover:bg-transparent h-auto px-0 py-0"
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
        <Button className="h-10 b rounded-lg w-full max-w-[130px] flex items-center justify-center gap-2 hover:bg-custom-engagement-boder/10 bg-custom-engagement-boder/10 border-gray-400 text-white">
          <Icon icon="bytesize:download" width="20" height="20" />
          Download
        </Button>
      </section>
      <section>
        <div className="flex md:justify-between md:items-center md:flex-row mb-10 flex-col gap-10">
          <DateToggle />

          <Button className="h-10 bg-custom-primary rounded-lg w-full max-w-fit flex items-center justify-center gap-2 hover:bg-custom-primary text-white">
            <Icon icon="bytesize:download" width="20" height="20" />
            View all Revenue
          </Button>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-5 md:gap-6">
          <RevenueCard />
          <RevenueCard />
          <RevenueCard />
        </div>
      </section>
    </ReportPageWrapper>
  );
};

export default ReportsPageClient;
