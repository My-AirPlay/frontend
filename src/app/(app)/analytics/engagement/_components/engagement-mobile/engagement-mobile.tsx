import React from "react";
import AnalyticsMobileWrapper from "../../../_component/analytics-mobile-wrapper";
import EngagementMobileCard from "../engagement-mobile-card/engagement-mobile.card";

const EngagementMobile = () => {
  return (
    <AnalyticsMobileWrapper>
      <EngagementMobileCard />
      <EngagementMobileCard />
      <EngagementMobileCard />
      <EngagementMobileCard />
      <EngagementMobileCard />
    </AnalyticsMobileWrapper>
  );
};

export default EngagementMobile;
