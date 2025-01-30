"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import engagementBg from "@/app/assets/engagement-bg.png";
import performanceBg from "@/app/assets/performance-bg.png";
import spotifyLogo from "@/app/assets/spotify-logo.svg";
import youtubeLogo from "@/app/assets/youtube.svg";
import appleMusic from "@/app/assets/apple-music.svg";
import soundCloud from "@/app/assets/SoundCloud.svg";
import Image from "next/image";
import { Plus } from "lucide-react";
import { Fragment } from "react";
import AnalyticsWrapper from "./analytics-wrapper";
import Link from "next/link";
import { urls } from "@/lib/constants";

const dummyData = [spotifyLogo, youtubeLogo, appleMusic, soundCloud];
const dummyEarnings = [
  {
    platform: "YouTube",
    detail: "Streaming",
    earning: "$3,902",
  },
  {
    platform: "Spotify",
    detail: "Downloads",
    earning: "$3,902",
  },
  {
    platform: "Apple Music",
    detail: "Downloads",
    earning: "$3,902",
  },
];
const dummyEngagements = [
  {
    name: "You are Mine",
    listens: "12,000",
    shares: "3,902",
  },
  {
    name: "God is good",
    listens: "8,000",
    shares: "3,902",
  },
  {
    name: "Do you know",
    listens: "4,000",
    shares: "3,902",
  },
];
const dummyDate = [5, 6, 7, 8, 9, 10, 11, 12, 13];
const AnalyticsClient = () => {
  return (
    <AnalyticsWrapper>
      <section className="grid md:grid-cols-3 grid-cols-1 *:min-h-[241px] gap-10 mb-6 justify-items-center md:justify-items-stretch">
        <article className="max-w-[306px] bg-white/[2%] rounded-lg border border-custom-analytics-border px-3 py-5 w-full">
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
          className="max-w-[306px] bg-white/[2%] rounded-lg border border-custom-analytics-border bg-no-repeat px-3 py-5 custom-bg-right w-full"
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
          className="max-w-[306px] w-full bg-white/[2%] rounded-lg border border-custom-analytics-border bg-no-repeat px-3 py-5 custom-bg-right flex flex-col justify-between"
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
      <section className="mb-6 px-6 py-3 md:bg-white/[2%] rounded-lg">
        <div className="flex items-center flex-col md:flex-row">
          <h2 className="text-white font-poppins text-15 font-medium p-[10px] w-fit">
            Analytics Breakdown
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
                  Earnings
                </Button>
              </li>
              <li className="px-4 py-1 rounded-[6px] w-fit text-custom-analytics-border font-inter text-10 font-medium">
                <Button
                  className="bg-transparent
                 hover:bg-transparent h-auto px-0 py-0 text-inherit"
                >
                  Engagements
                </Button>
              </li>
              <li className="px-4 py-1 rounded-[6px] w-fit text-custom-analytics-border font-inter text-10 font-medium">
                <Button
                  className="bg-transparent
                 hover:bg-transparent h-auto px-0 py-0 text-inherit"
                >
                  Uploads
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </section>
      <section className="bg-white/[2%] rounded-lg grid grid-cols-1 md:grid-cols-3 p-6 md:gap-2 gap-6">
        <article
          className="md:border-r md:border-r-white/[8%] md:border-b-0
        border-b border-b-white/[8%] md:pr-2"
        >
          <h2 className="p-[10px] text-white font-poppins font-semibold text-15 mb-6">
            Earnings Breakdown
          </h2>
          <div className="flex items-center justify-between mb-12">
            <div className="border border-custom-analytics-border rounded-full py-[6px] px-[7px] flex max-w-[169.93px] w-full">
              {dummyData.map((data, index) => (
                <div
                  className="w-full max-w-10 aspect-square grid place-items-center bg-custom-input_dark rounded-full first:ml-0 -ml-2 relative "
                  key={index}
                  style={{ zIndex: index + 100 }}
                >
                  <Image src={data} alt="" className="max-w-7 aspect-square" />
                </div>
              ))}
              <div className="w-full max-w-10 aspect-square grid place-items-center bg-custom-input_dark rounded-full -ml-2 relative  font-plus-jakarta-sans text-white text-10 font-semibold">
                +32
              </div>
            </div>
            <Link href={urls.analyticsEearrning}>
              <Button
                variant={"prodBtn"}
                className="flex items-center justify-center rounded-md px-3 py-2 gap-3 max-w-fit font-medium font-inter text-10 text-white"
              >
                <Plus className="w-4 h-4" />
                View All
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <small className="text-custom-analytics-border font-plus-jakarta-sans font-medium text-xs">
              Platforms
            </small>
            <small className="text-custom-analytics-border font-plus-jakarta-sans font-medium text-xs">
              Details
            </small>
            <small className="text-custom-analytics-border font-plus-jakarta-sans font-medium text-xs">
              Earnings
            </small>
            {dummyEarnings.map((earning, i) => (
              <Fragment key={i}>
                <small className="text-white font-plus-jakarta-sans font-normal text-xs">
                  {earning.platform}
                </small>
                <small className="text-white font-plus-jakarta-sans font-normal text-xs">
                  {earning.detail}
                </small>
                <small className="text-white font-plus-jakarta-sans font-normal text-xs">
                  {earning.earning}
                </small>
              </Fragment>
            ))}
          </div>
        </article>
        <article
          className="md:border-r md:border-r-white/[8%] md:border-b-0
        border-b border-b-white/[8%] md:pr-2"
        >
          <h2 className="p-[10px] text-white font-poppins font-semibold text-15 mb-6">
            Engagements
          </h2>
          <div className="flex items-center justify-between mb-12">
            <div className="border border-custom-analytics-border rounded-full py-[6px] px-[7px] flex max-w-[103.12px] w-full">
              <div className="w-full max-w-10 aspect-square grid place-items-center bg-custom-engagement-bg/[78%] rounded-full first:ml-0 -ml-2 relative  font-plus-jakarta-sans text-white text-10 font-semibold">
                <Icon
                  icon={"mingcute:headphone-line"}
                  className="w-6 h-6 text-white"
                />
              </div>
              <div className="w-full max-w-10 aspect-square grid place-items-center bg-custom-engagement-bg/[78%] rounded-full first:ml-0 -ml-2 relative  font-plus-jakarta-sans text-white text-10 font-semibold">
                <Icon icon="bx:like" className="w-6 h-6 text-white" />
              </div>
              <div className="w-full max-w-10 aspect-square grid place-items-center bg-custom-engagement-bg/[78%] rounded-full first:ml-0 -ml-2 relative  font-plus-jakarta-sans text-white text-10 font-semibold">
                <Icon
                  icon="bitcoin-icons:share-outline"
                  className="w-6 h-6 text-white"
                />
              </div>
            </div>
            <Link href={urls.analyticsEngagement}>
              <Button
                variant={"prodBtn"}
                className="flex items-center justify-center rounded-md px-3 py-2 gap-3 max-w-fit font-medium font-inter text-10 text-white"
              >
                <Plus className="w-4 h-4" />
                View All
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <small className="text-custom-analytics-border font-plus-jakarta-sans font-medium text-xs">
              Music Name
            </small>
            <small className="text-custom-analytics-border font-plus-jakarta-sans font-medium text-xs">
              No of Listens
            </small>
            <small className="text-custom-analytics-border font-plus-jakarta-sans font-medium text-xs">
              Share & Saves
            </small>
            {dummyEngagements.map((engagement, i) => (
              <Fragment key={i}>
                <small className="text-white font-plus-jakarta-sans font-normal text-xs">
                  {engagement.name}
                </small>
                <small className="text-white font-plus-jakarta-sans font-normal text-xs">
                  {engagement.listens}
                </small>
                <small className="text-white font-plus-jakarta-sans font-normal text-xs">
                  {engagement.shares}
                </small>
              </Fragment>
            ))}
          </div>
        </article>
        <article className="max-w-[248px] mx-auto w-full">
          <div className="flex items-center justify-between mb-12">
            <h2 className="p-[10px] text-white font-poppins font-semibold text-15">
              Uploads
            </h2>
            <Link href={urls.analyticsUploads}>
              <Button
                variant={"prodBtn"}
                className="flex items-center justify-center rounded-md px-3 py-2 gap-3 max-w-fit font-medium font-inter text-10 text-white"
              >
                <Plus className="w-4 h-4" />
                View All
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {dummyDate.map((date) => (
              <div
                key={date}
                className="aspect-square border-custom-engagement-boder/40 border rounded-lg font-poppins text-custom-analytics-border font-semibold text-xs max-w-[61.52px] flex items-end p-3 first:bg-gradient-to-br first:from-custom-engagement-bg first:to-custom-primary first:text-white"
              >
                {date}th
              </div>
            ))}
          </div>
        </article>
      </section>
    </AnalyticsWrapper>
  );
};

export default AnalyticsClient;
