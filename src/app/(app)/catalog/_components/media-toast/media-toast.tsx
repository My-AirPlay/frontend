import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface MediaToastProps {
  onClose?: () => void;
}
const MediaToast = ({ onClose }: MediaToastProps) => {
  return (
    <div className="bg-custom-dashboard-card border border-custom-error px-4 py-5 rounded-lg">
      <div className="flex items-center gap-[6px] mb-[10px]">
        <div className="text-white px-[5px] py-1  bg-custom-primary rounded-lg grid place-items-center w-fit">
          <Icon icon={"fluent:important-24-filled"} width={20} />
        </div>
        <h2 className="text-white font-plus-jakarta-sans font-semibold text-sm">
          Important Notice
        </h2>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-plus-jakarta-sans text-xs text-white">
          Uploaded videos will expire after 30 days.
        </p>
        <button
          onClick={onClose}
          className="font-plus-jakarta-sans font-bold text-white text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MediaToast;
