"use client";
import { plusJakartaSans } from "@/lib/fonts";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false,
      },
      ticks: {
        font: {
          family: plusJakartaSans.style.fontFamily,
          weight: 400,
          size: 13,
        },
        color: "white",
      },
    },
    y: {
      stacked: true,
      grid: {
        color: "rgba(217, 225, 231,0.4)",
      },
      ticks: {
        font: {
          family: plusJakartaSans.style.fontFamily,
          weight: 400,
          size: 13,
        },
        color: "white",
      },
    },
  },
  plugins: {
    title: {
      display: false,
      text: "Chart.js Bar Chart - Stacked",
    },
    legend: {
      labels: {
        font: {
          family: "var(--font-jakarta-sans)",
        },
        color: "blue",
      },
      display: false,
    },
  },
  //   responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  maintainAspectRatio: false,
};

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const MetricsBarChart = () => {
  return (
    <div>
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: "Spotify",
              data: [10, 4, 2, 40, 50, 20, 10],
              backgroundColor: "#F2C94C",
              stack: "Stack 0",
              borderRadius: Number.MAX_VALUE,
              barThickness: 6,
              barPercentage: 0.3,
            },
            {
              label: "Yotube",
              data: [20, 8, 4, 20, 60, 40, 10],
              backgroundColor: "#EB5757",
              stack: "Stack 0",
              borderRadius: Number.MAX_VALUE,
              barThickness: 6,
              barPercentage: 0.3,
            },
            {
              label: "Apple mustic",
              data: [20, 8, 4, 20, 60, 40, 10],
              backgroundColor: "#FE7602",
              stack: "Stack 0",
              borderRadius: Number.MAX_VALUE,
              barThickness: 6,
              barPercentage: 0.3,
            },
          ],
        }}
        options={options}
        height={316}
      />
    </div>
  );
};

export default MetricsBarChart;
