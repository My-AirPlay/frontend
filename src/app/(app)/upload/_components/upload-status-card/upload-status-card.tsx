import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
interface UploadStatusCardProp {
  fileName: string;
  fileSize: string;
}
const UploadStatusCard = ({ fileName, fileSize }: UploadStatusCardProp) => {
  return (
    <div className="p-4 rounded-md bg-[#11171D] flex flex-col gap-1">
      <div className="flex items-start gap-3">
        <Icon
          icon="gridicons:audio"
          width={20}
          height={20}
          className="text-[rgba(193,193,193,0.76)]"
        />
        <div className="flex flex-col flex-1">
          <small className="font-bold font-plus-jakarta-sans text-sm text-white">
            {fileName}
          </small>
          <small className="text-[#989692] font-plus-jakarta-sans font-normal text-xs">
            {fileSize}
          </small>
        </div>
        <Icon
          icon="mdi:tick-circle"
          width="20"
          height="20"
          className="text-custom-success"
        />
      </div>
    </div>
  );
};

export default UploadStatusCard;
