import AnalyticsTableWrapper from "@/app/(app)/analytics/_component/analytics-table-wrapper";
import React from "react";
import RevenueChart from "../revenue-chart/revenue-chart";

const RevenueCard = () => {
  return (
    <AnalyticsTableWrapper>
      <div className="md:max-w-[273.21px] max-w-72 mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-custom-primary" />
            <span className="font-plus-jakarta-sans text-white font-normal text-10">
              Highest Revenue
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-custom-error" />
            <span className="font-plus-jakarta-sans text-white font-normal text-10">
              Lowest Revenue
            </span>
          </div>
        </div>
        <RevenueChart />
      </div>
    </AnalyticsTableWrapper>
  );
};

export default RevenueCard;
