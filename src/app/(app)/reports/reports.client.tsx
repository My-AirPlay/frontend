"use client";
import React from "react";
import ReportPageWrapper from "./_components/reports-wrapper/reports-wrapper";
import { Icon } from "@iconify/react/dist/iconify.js";
import DemographicLocationPieChart from "./_components/demographics-charts/location-pie-chart/location-pie-chart";

const ReportsPageClient = () => {
  return (
    <ReportPageWrapper>
      <h2 className="font-plus-jakarta-sans font-extrabold text-white text-xl mb-5">
        Demographics{" "}
      </h2>
      <section className="flex">
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

          <DemographicLocationPieChart />
        </article>
      </section>
    </ReportPageWrapper>
  );
};

export default ReportsPageClient;
