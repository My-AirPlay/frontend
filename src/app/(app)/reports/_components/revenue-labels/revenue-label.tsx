import React from "react";

interface RevenueLabelProps {
  highLabel?: string;
  lowLabel?: string;
}
const RevenueLabel = ({
  highLabel = "Highest Revenue",
  lowLabel = "Lowest Revenue",
}: RevenueLabelProps) => {
  return (
    <div className="flex items-center gap-3 ">
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 rounded-full bg-custom-primary" />
        <span className="font-plus-jakarta-sans text-white font-normal text-10">
          {highLabel}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 rounded-full bg-custom-error" />
        <span className="font-plus-jakarta-sans text-white font-normal text-10">
          {lowLabel}
        </span>
      </div>
    </div>
  );
};

export default RevenueLabel;
