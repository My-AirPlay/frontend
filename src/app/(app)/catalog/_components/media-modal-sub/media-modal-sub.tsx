import React from "react";
interface MediaModalSubProps {
  title: string;
  description: string;
}
const MediaModalSub = ({ title, description }: MediaModalSubProps) => {
  return (
    <div className="flex flex-col gap-[13px]">
      <small className="text-white font-plus-jakarta-sans font-normal text-[13px]">
        {title}
      </small>
      <small className="text-white/30 font-plus-jakarta-sans font-normal text-[11px]">
        {description}
      </small>
    </div>
  );
};

export default MediaModalSub;
