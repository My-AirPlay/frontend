"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Link from "next/link";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Male", "Female"],
  datasets: [
    {
      label: "Total Audience",
      data: [12, 19],
      backgroundColor: ["#FE7602", "rgba(255,255,255,1)"],
      borderJoinStyle: "round",
      borderRadius: 999999,
    },
  ],
};
const GenderChart = () => {
  return (
    <div className="flex gap-[50px]">
      <div className="max-w-[231px]">
        <Doughnut
          data={{
            datasets: [
              {
                label: "Total Audience",
                data: [12, 19],
                backgroundColor: ["#FE7602", "rgba(255,255,255,1)"],
                // borderJoinStyle: "bevel",
                // borderRadius: 999999,
                borderDashOffset: 10,
                // spacing: 10,
              },
            ],
          }}
          // style={{
          //   backgroundColor: "white",
          // }}
        />
        <div className="font-extrabold font-plus-jakarta-sans text-white text-[27px] flex flex-col gap-1 items-center">
          <small>--</small>
          <small className="font-normal text-[15px]">Total Audience</small>
        </div>
      </div>
      <div>
        <div>
          <div className="flex justify-between gap-24 mb-6">
            <div className="flex flex-col gap-[5px] items-center">
              <div className="flex  items-center gap-3">
                <div className="w-4 h-4 rounded-[5px] bg-custom-primary" />
                <small className="font-plus-jakarta-sans font-extrabold text-white text-[27px]">
                  --
                </small>
              </div>
              <p className="font-plus-jakarta-sans font-normal text-white text-[15px] text-center">
                Male
              </p>
            </div>
            <div className="flex flex-col gap-[5px] items-center">
              <div className="flex  items-center gap-3">
                <div className="w-4 h-4 rounded-[5px] bg-white" />
                <small className="font-plus-jakarta-sans font-extrabold text-white text-[27px]">
                  --
                </small>
              </div>
              <p className="font-plus-jakarta-sans font-normal text-white text-[15px] text-center">
                Female
              </p>
            </div>
          </div>
          <div className="flex gap-[18px] items-center  ">
            <Link
              href="#"
              className="  h-8 bg-custom-primary  max-w-[200px] rounded-full w-full font-bold font-plus-jakarta-sans text-[13px] grid place-items-center text-white"
            >
              View Analytics
            </Link>
            <small className="font-plus-jakarta-sans font-normal text-sm text-[#A4A4A4]  max-w-[134px]">
              Keep track off your demographics
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenderChart;
