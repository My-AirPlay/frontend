import React from "react";
import AnalyticsMobileWrapper from "../../../_component/analytics-mobile-wrapper";
import UploadMobileCard from "../upload-mobile-item/upload-mobile-card";

const UploadMobile = () => {
  return (
    <AnalyticsMobileWrapper>
      <UploadMobileCard />
      <UploadMobileCard />
      <UploadMobileCard />
      <UploadMobileCard />
    </AnalyticsMobileWrapper>
  );
};

export default UploadMobile;
