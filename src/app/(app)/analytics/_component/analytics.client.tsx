"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import engagementBg from "@/app/assets/engagement-bg.png";
import performanceBg from "@/app/assets/performance-bg.png";
const AnalyticsClient = () => {
  return (
    <section className="mt-[88px]">
      <div className="flex justify-between items-center mb-9">
        <h1 className="text-white font-plus-jakarta-sans font-semibold md:text-30 text-2xl">
          Analytics Overview
        </h1>
        <div>
          <Button className="h-10 bg-custom-primary rounded-lg w-full max-w-[130px] flex items-center justify-center gap-2 hover:bg-custom-primary">
            <Icon icon="bytesize:download" width="20" height="20" />
            Download
          </Button>
        </div>
      </div>
      <section className="grid md:grid-cols-3 grid-cols-1 *:min-h-[241px] gap-10 justify-items-center">
        <article className="max-w-[306px] bg-white/5 rounded-lg border border-custom-analytics-border px-3 py-5 w-full">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-full max-w-12 aspect-square grid place-items-center bg-custom-input_dark rounded text-white">
                <Icon icon={"fa-solid:coins"} width={30} height={30} />
              </div>
              <h2 className="text-white flex flex-col font-poppins font-semibold text-base">
                <span className="font-inter font-medium text-[10px]  text-custom-analytics-border">
                  Earnings
                </span>
                Total Overview
              </h2>
            </div>
            <Icon icon={"ep:more-filled"} color="white" width={24} />
          </div>
          <p className="font-plus-jakarta-sans font-medium text-[10px] text-custom-analytics-border max-w[206px] mb-6">
            Your average earnings over the last 7 days are &gt;46%
          </p>
          <ul className="flexflex-col gap-2">
            <li className="flex justify-between items-center">
              <small className="text-white font-plus-jakarta-sans font-semibold text-[10px]">
                YouTube Music
              </small>
              <div className="flex items-center gap-1">
                <small className="text-10 text-gray-400 font-poppins font-normal">
                  $4,645
                </small>

                <Icon
                  icon="mdi-light:arrow-up"
                  width={24}
                  height={24}
                  color="#1ED760"
                />
                <small className="font-poppins font-semibold text-10 text-white">
                  65%
                </small>
              </div>
            </li>
            <li className="flex justify-between items-center">
              <small className="text-white font-plus-jakarta-sans font-semibold text-[10px]">
                Apple Music
              </small>
              <div className="flex items-center gap-1">
                <small className="text-10 text-gray-400 font-poppins font-normal">
                  $4,645
                </small>

                <Icon
                  icon="mdi-light:arrow-down"
                  width={24}
                  height={24}
                  color="#EB5757"
                />
                <small className="font-poppins font-semibold text-10 text-white">
                  24%
                </small>
              </div>
            </li>
            <li className="flex justify-between items-center">
              <small className="text-white font-plus-jakarta-sans font-semibold text-[10px]">
                Spotify
              </small>
              <div className="flex items-center gap-1">
                <small className="text-10 text-gray-400 font-poppins font-normal">
                  $4,645
                </small>

                <Icon
                  icon="mdi-light:arrow-up"
                  width={24}
                  height={24}
                  color="#1ED760"
                />
                <small className="font-poppins font-semibold text-10 text-white">
                  65%
                </small>
              </div>
            </li>
          </ul>
        </article>
        <article
          className="max-w-[306px] bg-white/5 rounded-lg border border-custom-analytics-border bg-no-repeat px-3 py-5 custom-bg-right w-full"
          style={{
            backgroundImage: `url(${engagementBg.src})`,
          }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white flex flex-col font-poppins font-semibold text-base">
              <span className="font-inter font-medium text-[10px]  text-custom-analytics-border">
                Engagement Statistics
              </span>
              &lt; 70%
            </h2>
            <div className="text-custom-analytics-border font-inter font-medium text-10  px-[10px] py-1 rounded-lg border border-custom-analytics-border">
              Weekly
            </div>
          </div>
          <article className=" max-w-[158px] px-1 py-[10px] bg-custom-profile-btn border border-custom-engagement-boder/40 rounded-lg mb-8">
            <small className="font-inter font-medium text-custom-analytics-border text-10 block mb-3">
              Jan 18,2025
            </small>
            <div className="flex items-center justify-between mb-2">
              <small className="font-inter font-medium text-custom-analytics-border text-10 block ">
                Number of Listens
              </small>
              <small className="font-inter font-medium text-custom-analytics-border text-10 block">
                500
              </small>
            </div>
            <div className="flex items-center justify-between">
              <small className="font-inter font-medium text-custom-analytics-border text-10 block ">
                Shares and Saves
              </small>
              <small className="font-inter font-medium text-custom-analytics-border text-10 block ">
                500
              </small>
            </div>
          </article>
          <div className="border px-1 flex items-center gap-[6px] border-custom-error rounded-lg font-poppins font-semibold text-10 text-custom-error w-fit">
            <Icon icon="mdi-light:arrow-down" width={24} height={24} />
            24%
          </div>
        </article>
        <article
          className="max-w-[306px] w-full bg-white/5 rounded-lg border border-custom-analytics-border bg-no-repeat px-3 py-5 custom-bg-right flex flex-col justify-between"
          style={{
            backgroundImage: `url(${performanceBg.src})`,
          }}
        >
          <div className="flex justify-between items-center ">
            <h2 className="text-white flex flex-col font-poppins font-semibold text-base">
              <span className="font-inter font-medium text-[10px]  text-custom-analytics-border">
                Performance Metrics
              </span>
              100%
            </h2>
            <div className="text-custom-analytics-border font-inter font-medium text-10  px-[10px] py-1 rounded-lg border border-custom-analytics-border">
              Music
            </div>
          </div>
          <article className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="p-1 w-full max-w-[130px] py-2 bg-custom-profile-btn border border-b-[#D9D9D9] rounded flex justify-center items-center gap-[6px] text-white font-poppins text-xs">
                You are my angel
                <Icon icon={"charm:music"} width={10} height={10} />
              </div>
              <div className="px-2 py-[2px]  w-fit  bg-custom-profile-btn border border-b-[#D9D9D9] rounded flex justify-center items-center gap-[6px] text-white font-poppins text-xs">
                23,000 Play counts
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="p-1 w-full max-w-[130px] py-2 bg-custom-profile-btn border border-b-[#D9D9D9] rounded flex justify-center items-center gap-[6px] text-white font-poppins text-xs">
                Revenue Generated
              </div>
              <div className="px-2 py-[2px]  w-fit  bg-custom-profile-btn border border-b-[#D9D9D9] rounded flex justify-center items-center gap-[6px] text-white font-poppins text-xs">
                $23,000
              </div>
            </div>
          </article>
        </article>
      </section>
    </section>
  );
};

export default AnalyticsClient;
