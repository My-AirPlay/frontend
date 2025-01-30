"use client";

import AnalyticsWrapper from "../_component/analytics-wrapper";

import EarningTable from "./_component/earning-table/earning-table";
import EarningMobileTable from "./_component/earning-table-mobile/earning-table-mobile";
import PaginationBar from "../_component/pagination-bar";
import AnalyticsTableWrapper from "../_component/analytics-table-wrapper";
import DateToggle from "../_component/date-toggle";
const EarningClient = () => {
  return (
    <AnalyticsWrapper>
      <h2 className="text-white font-plus-jakarta-sans font-extrabold text-xl mb-16">
        Earnings Breakdown
      </h2>

      <AnalyticsTableWrapper>
        <DateToggle />
        <EarningTable />
        <EarningMobileTable />
        <PaginationBar />
      </AnalyticsTableWrapper>
    </AnalyticsWrapper>
  );
};

export default EarningClient;
