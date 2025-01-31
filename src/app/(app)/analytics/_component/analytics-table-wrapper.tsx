import { Icon } from "@iconify/react/dist/iconify.js";
import React, { ReactNode } from "react";

const AnalyticsTableWrapper = ({
  children,
  leftEl = null,
}: {
  children: ReactNode;
  leftEl?: ReactNode | null;
}) => {
  return (
    <section className="bg-custom-analytics-table rounded-[16px] py-2    ">
      <div className="flex justify-between items-center   border-b border-b-custom-input_dark  px-6 mb-5 pb-2">
        <div className="flex items-center gap-2  ">
          <Icon
            icon="lsicon:drag-filled"
            width="24"
            height="24"
            color="#F1F1F1"
          />
          <div className="flex flex-col">
            <small className="font-plus-jakarta-sans font-semibold text-xl text-white">
              Period
            </small>
            <small className="font-plus-jakarta-sans font-normal text-sm text-custom-engagement-boder">
              Oct to Dec 2024
            </small>
          </div>
        </div>
        {leftEl}
      </div>
      {children}
    </section>
  );
};

export default AnalyticsTableWrapper;
