import React from "react";
import youtube from "@/app/assets/youtube.svg";
import music from "@/app/assets/music.png";
import Image from "next/image";

const EarningMobileCard = () => {
  return (
    <article className="border border-custom-input_dark rounded-lg py-4">
      <div className="px-4 pb-6 border-b border-b-custom-input_dark flex items-center gap-3">
        <Image src={youtube} alt="youtube" width={40} height={40} />
        <small className="font-plus-jakarta-sans font-normal text-sm text-custom-icon-btn-border">
          YouTube
        </small>
      </div>
      <div className="px-4 py-6 border-b border-b-custom-input_dark flex flex-col gap-3 ">
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
      <div className="px-4 pt-4 flex justify-between ">
        <div className="flex flex-col gap-3">
          <small className="font-plus-jakarta-sans font-normal text-sm text-custom-icon-btn-border">
            Music name
          </small>
          <div className="border border-custom-success w-fit rounded px-3 font-plus-jakarta-sans text-custom-success font-normal text-xs">
            Streaming
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <small className="font-plus-jakarta-sans font-normal text-sm text-custom-icon-btn-border">
            Earnings (<span className="text-custom-footer_border">USD</span>)
          </small>
          <small className="font-plus-jakarta-sans font-normal text-sm text-custom-icon-btn-border">
            $12,000
          </small>
        </div>
      </div>
    </article>
  );
};

export default EarningMobileCard;
