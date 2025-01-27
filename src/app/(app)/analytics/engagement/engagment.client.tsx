"use client";
import React from "react";
import AnalyticsWrapper from "../_component/analytics-wrapper";

import PaginationBar from "../_component/pagination-bar";
import AnalyticsTableWrapper from "../_component/analytics-table-wrapper";
import DateToggle from "../_component/date-toggle";
import EngagementTable from "./_components/engagment-table/engagement-table";
import EngagementMobile from "./_components/engagement-mobile/engagement-mobile";

const EngagementClient = () => {
  return (
    <AnalyticsWrapper>
      <h2 className="text-white font-plus-jakarta-sans font-extrabold text-xl mb-16">
        Engagement Breakdown
      </h2>
      <AnalyticsTableWrapper>
        <DateToggle />
        <EngagementTable />
        <EngagementMobile />
        <PaginationBar />
      </AnalyticsTableWrapper>
    </AnalyticsWrapper>
  );
};

export default EngagementClient;
