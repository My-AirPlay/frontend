import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import React from "react";
import youtube from "@/app/assets/youtube.svg";
import musicImg from "@/app/assets/music.png";

const EarningTableItem = () => {
  return (
    <tr className="border-b-2 border-b-custom-input_dark">
      <td className="py-[14px] px-3 font-inter text-sm text-white font-normal">
        1
      </td>
      <td className="py-[14px] px-3 font-inter text-sm text-white font-normal w-[170.92px]">
        <div className="flex items-center ">
          <Image className="w-[50.96px]" src={youtube} alt="" />
          <small>YouTube</small>
        </div>
      </td>
      <td className="py-[14px] px-3 font-inter text-sm text-white font-normal">
        <div className="border border-custom-success w-fit rounded px-3 font-plus-jakarta-sans text-custom-success font-normal text-xs">
          Streaming
        </div>
      </td>
      <td className="py-[14px] px-3 font-inter text-sm text-white font-normal ">
        <div className="flex items-center gap-3">
          <Image className="w-6" src={musicImg} alt="" />
          <small>You are my angel</small>
        </div>
      </td>
      <td className="py-[14px] px-3 font-inter text-sm text-white font-normal ">
        <div className="flex items-center gap-3">$452.85</div>
      </td>
      <td className="py-[14px] px-3 font-inter text-sm text-white font-normal w-[99.79px]">
        <div className="flex items-end gap-3">
          <Icon icon="ri:more-line" width="24" height="24" color="#D9D9D9" />
        </div>
      </td>
    </tr>
  );
};

export default EarningTableItem;
