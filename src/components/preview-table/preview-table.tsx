import React, { Fragment } from "react";
export interface PreviewTableProps {
  previewData: {
    title: string;
    value: string;
  }[][];
}
const PreviewTable = ({ previewData }: PreviewTableProps) => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 items-start justify-between md:mb-[59px] mb-[110px]">
      {previewData.map((data, i) => (
        <div className="grid gap-y-4 grid-cols-2 " key={i}>
          {data.map((onboardingInfo) => (
            <Fragment key={onboardingInfo.title}>
              <small className="font-plus-jakarta-sans  text-white font-semibold h-9 text-base">
                {onboardingInfo.title}
              </small>
              <small className="font-plus-jakarta-sans  text-white font-semibold text-base">
                {onboardingInfo.value || "--"}
              </small>
            </Fragment>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PreviewTable;
