import GenderChart from "@/components/gender-chart/gender-chart";
import { urls } from "@/lib/constants";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React from "react";
import ageSvg from "@/app/assets/allocation.svg";
import Image from "next/image";
import MetricsDropdown from "./_components/metrics-dropdown/metrics-dropdown";
import { Button } from "@/components/ui/button";
import MetricsBarChart from "./_components/metrics-bar-chart/metrics-bar-chart";
const DashboardPage = () => {
  return (
    <>
      <h1 className="font-plus-jakarta-sans mb-[50px] text-white font-semibold text-2xl md:my-11 my-[55px]">
        Dashboard Overview
      </h1>
      <section className="grid md:grid-cols-3 grid-cols-1 gap-[29px] mb-[50px]">
        <article className="px-[34px] py-[29px] rounded-[20px] bg-gradient-to-bl from-custom-primary to-white flex flex-col gap-[30px]">
          <div className="text-white flex items-center gap-4">
            <Icon icon="fa-solid:coins" width={56} height={56} />
            <h2 className="font-plus-jakarta-sans font-extrabold text-white text-28">
              Total <br /> Earnings
            </h2>
          </div>
          <p className="font-plus-jakarta-sans text-white  font-extrabold text-40">
            $0
          </p>

          <p className="font-plus-jakarta-sans font-medium text-[15px]">
            You have no data yet
          </p>
        </article>

        <article className="bg-custom-dashboard-card border-custom-dashboard-card-stroke border rounded-[15px] py-[29px] px-[33px]">
          <div className="text-white mb-[23px] flex items-center gap-4">
            <Icon icon="ep:upload-filled" width={56} height={56} />
            <h2 className="font-plus-jakarta-sans font-extrabold text-white text-28">
              Recent <br /> Uploads
            </h2>
          </div>
          <p className="font-plus-jakarta-sans text-white  font-extrabold text-40 mb-[17px]">
            0
          </p>
          <div className="flex items-center justify-between  mb-3">
            <div className="text-white items-center flex gap-3">
              <Icon icon="fa6-solid:cloud" width="23" height="16" />
              <small className="font-plus-jakarta-sans font-medium text-[15px]">
                Storage
              </small>
            </div>
            <small className="text-custom-success font-plus-jakarta-sans font-medium text-[15px]">
              --
            </small>
          </div>
          <div className="h-[10px] rounded-full bg-white overflow-hidden mb-3">
            <div className="h-full w-1/2 rounded-full bg-custom-primary" />
          </div>
          <small className="text-white  font-plus-jakarta-sans font-medium text-[15px]">
            --
          </small>
        </article>

        <article className="px-[32px] py-[34px] border border-white/5 rounded-3xl max-w-[262px] h-fit  card-radial flex flex-col self-center items-center">
          <small className="font-plus-jakarta-sans font-bold text-white text-60 text-center">
            12K
          </small>
          <small className="text-white text-center font-normal text-lg">
            happy users
          </small>
          <Link
            href={urls.uploadMusic}
            className="  h-8 bg-custom-primary mx-auto max-w-[132px] rounded-full w-full font-bold font-plus-jakarta-sans text-[13px] grid place-items-center text-white"
          >
            Upload Music
          </Link>
        </article>
      </section>
      <section className="flex flex-col md:flex-row gap-10 ">
        <article className="w-full flex-1 bg-custom-dashboard-card rounded-[15px] border border-custom-dashboard-card-stroke px-9 py-8">
          <div className="text-white flex items-center justify-between flex-col md:flex-row">
            <div>
              <h2 className="text-white font-bold font-plus-jakarta-sans text-25">
                Analytics Summary
              </h2>
              <p className="font-plus-jakarta-sans text-white font-normal text-[15px]">
                Visual representation of demographics
              </p>
            </div>
            <Icon icon="material-symbols:more-horiz" width="29" height="29" />
          </div>
          <div className="flex md:block flex-col">
            <GenderChart />
            <div className="border-t-2 border-t-custom-dashboard-card-stroke border-dashed mt-[66px] mb-9" />
            <div className="grid md:grid-cols-2 gap-11 grid-cols-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-white w-[45px] h-[45px] rounded-[6px] grid place-items-center">
                    <Icon
                      icon={"tdesign:location-filled"}
                      color="black"
                      width={24}
                      height={24}
                    />
                  </div>
                  <p className="font-plus-jakarta-sans font-semibold text-white text-[17px] flex flex-col gap-[7px]">
                    Location
                    <small>--</small>
                  </p>
                </div>

                <small className="font-plus-jakarta-sans text-custom-primary font-normal text-[10px]">
                  No data yet
                </small>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-white w-[45px] h-[45px] rounded-[6px] grid place-items-center">
                    <Image src={ageSvg} width={24} height={24} alt="" />
                  </div>
                  <p className="font-plus-jakarta-sans font-semibold text-white text-[17px] flex flex-col gap-[7px]">
                    Age Distribution
                    <small>--</small>
                  </p>
                </div>

                <small className="font-plus-jakarta-sans text-custom-primary font-normal text-[10px]">
                  No data yet
                </small>
              </div>
            </div>
          </div>
        </article>
        <article className="bg-custom-dashboard-card rounded-[15px] w-full max-w-[468px] border border-custom-dashboard-card-stroke px-9 py-8 flex flex-col gap-[25px]">
          <div className="flex items-center justify-between flex-wrap">
            <h2 className="font-plus-jakarta-sans font-bold text-white text-25">
              Metrics
            </h2>
            <MetricsDropdown />
            <Button variant={"prodBtn"}>View all metrics</Button>
          </div>

          <MetricsBarChart />
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 after:w-2 after:h-2 bg-white rounded-full after:bg-custom-primary after:rounded-full grid place-items-center" />
              <small className="font-plus-jakarta-sans font-normal text-[13px] text-white">
                Spotify
              </small>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 after:w-2 after:h-2 bg-white rounded-full after:bg-custom-error after:rounded-full grid place-items-center" />
              <small className="font-plus-jakarta-sans font-normal text-[13px] text-white">
                Youtube
              </small>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 after:w-2 after:h-2 bg-white rounded-full after:bg-[#F2C94C] after:rounded-full grid place-items-center" />
              <small className="font-plus-jakarta-sans font-normal text-[13px] text-white">
                Apple music
              </small>
            </div>
          </div>
        </article>
      </section>
    </>
  );
};

export default DashboardPage;
