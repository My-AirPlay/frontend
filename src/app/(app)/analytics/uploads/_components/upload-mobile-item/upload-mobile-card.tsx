import React from "react";
import AnalyticsTableCardWrapper from "../../../_component/analytics-card-wrapper";
import Image from "next/image";
import music from "@/app/assets/music.png";
import youtube from "@/app/assets/youtube.svg";

const UploadMobileCard = () => {
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
            Upload Type
          </small>
          <div className="border border-custom-success w-fit rounded px-3 font-plus-jakarta-sans text-custom-success font-normal text-xs">
            Audio
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <small className="font-plus-jakarta-sans font-normal text-sm text-custom-icon-btn-border">
            Duration
          </small>
          <small className="font-plus-jakarta-sans font-normal text-sm text-custom-icon-btn-border">
            2 weeks
          </small>
        </div>
      </div>
      <div className="flex pt-4 px-4 flex-col gap-3">
        <small className="font-plus-jakarta-sans font-normal text-sm text-custom-icon-btn-border">
          Performance
        </small>
        <div className="flex items-center gap-3">
          <Image className="w-6" src={youtube} alt="" />
          <small className="font-plus-jakarta-sans font-normal text-sm text-custom-icon-btn-border">
            No 11 on YouTube
          </small>
        </div>
      </div>
    </AnalyticsTableCardWrapper>
  );
};

export default UploadMobileCard;
