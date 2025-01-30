import React from "react";
import AnalyticsTableCardWrapper from "../../../_component/analytics-card-wrapper";
import Image from "next/image";
import music from "@/app/assets/music.png";
const EngagementMobileCard = () => {
  return (
    <AnalyticsTableCardWrapper>
      <div className="px-4 pb-6 border-b border-b-custom-input_dark flex flex-col gap-3 ">
        <small className="font-plus-jakarta-sans font-normal text-sm text-custom-icon-btn-border">
          Music name
        </small>
        <div className="flex items-center gap-3">
          <Image src={music} alt="youtube" width={24} height={24} />
          <small className="font-plus-jakarta-sans font-normal text-sm text-custom-icon-btn-border">
            You are my angel
          </small>
        </div>
      </div>
      <div className="flex justify-between py-4 border-b border-b-custom-input_dark px-4">
        <div className="flex flex-col gap-3">
          <small className="font-plus-jakarta-sans font-normal text-sm text-custom-icon-btn-border">
            User Engagement (
            <span className="text-custom-footer_border">Number of Listens</span>
            )
          </small>
          <small className="font-plus-jakarta-sans font-normal text-sm text-custom-icon-btn-border">
            1900
          </small>
        </div>
        <div className="flex flex-col gap-3">
          <small className="font-plus-jakarta-sans font-normal text-sm text-custom-icon-btn-border">
            User Engagement (
            <span className="text-custom-footer_border">Amount of shares</span>)
          </small>
          <small className="font-plus-jakarta-sans font-normal text-sm text-custom-icon-btn-border">
            1900
          </small>
        </div>
      </div>
      <div className="flex flex-col gap-3 px-4">
        <small className="font-plus-jakarta-sans font-normal text-sm text-custom-icon-btn-border">
          User Engagement (
          <span className="text-custom-footer_border">Number of saved</span>)
        </small>
        <small className="font-plus-jakarta-sans font-normal text-sm text-custom-icon-btn-border">
          1900
        </small>
      </div>
    </AnalyticsTableCardWrapper>
  );
};

export default EngagementMobileCard;
