"use client";
import { ArcElement, Legend, Tooltip, Chart as ChartJS } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [62, 38],
      backgroundColor: ["#2a2b3e58", "#7b7b7bc3"],

      borderRadius: 8,
      borderWidth: 0,
    },
  ],
};

const GenderPieChart = () => {
  return (
    <div className="max-w-[118.03px]">
      <Doughnut
        data={data}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};

export default GenderPieChart;
