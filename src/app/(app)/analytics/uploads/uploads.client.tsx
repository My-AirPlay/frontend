"use client";
import React from "react";
import AnalyticsWrapper from "../_component/analytics-wrapper";
import AnalyticsTableWrapper from "../_component/analytics-table-wrapper";
import DateToggle from "../_component/date-toggle";
import PaginationBar from "../_component/pagination-bar";
import UploadTable from "./_components/upload-table/upload-table";
import UploadMobile from "./_components/upload-mobile/upload-mobile";

const UploadsBreakdownClient = () => {
  return (
    <AnalyticsWrapper>
      <h2 className="text-white font-plus-jakarta-sans font-extrabold text-xl mb-16">
        Uploads Breakdown
      </h2>

      <AnalyticsTableWrapper>
        <DateToggle />
        <UploadTable />
        <UploadMobile />
        <PaginationBar />
      </AnalyticsTableWrapper>
    </AnalyticsWrapper>
  );
};

export default UploadsBreakdownClient;
