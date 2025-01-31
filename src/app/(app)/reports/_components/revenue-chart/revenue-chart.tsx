import React from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { generateRevenuChartPlugins } from "@/lib/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = () => {
  return (
    <div>
      <Line
        data={{
          datasets: [
            {
              data: [10, 20, 30, 13, 12, 30],
              label: "Main",
              backgroundColor: "#FE6902",
              borderColor: "#FE6902",
              borderCapStyle: "round",
              borderWidth: 2,
              tension: 0.4,

              pointBorderWidth: 4,
              pointBorderColor: "#000",
              pointRadius: 8,
            },
            {
              data: [13, 10, 25, 18, 11, 20],
              label: "Main",
              backgroundColor: "#EB5757",
              borderColor: "#EB5757",
              borderCapStyle: "round",
              borderWidth: 2,
              tension: 0.4,

              pointBorderWidth: 4,
              pointBorderColor: "#000",
              pointRadius: 8,
            },
          ],
          labels: ["JAn", "Feb", "Mar", "Apr", "May", "Jum"],
        }}
        options={{ ...generateRevenuChartPlugins() }}
      />
    </div>
  );
};

export default RevenueChart;
