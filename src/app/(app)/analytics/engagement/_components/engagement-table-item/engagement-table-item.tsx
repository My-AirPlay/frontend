import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import React from "react";
import musicImg from "@/app/assets/music.png";

const EngagementTableItem = () => {
  return (
    <tr className="border-b-2 border-b-custom-input_dark">
      <td className="py-[14px] px-3 font-inter text-sm text-white font-normal">
        1
      </td>
      <td className="py-[14px] px-3 font-inter text-sm text-white font-normal ">
        <div className="flex items-center gap-3">
          <Image className="w-6" src={musicImg} alt="" />
          <small>You are my angel</small>
        </div>
      </td>

      <td className="py-[14px] px-3 font-inter text-sm text-white font-normal ">
        <div className="flex items-center gap-3">1900</div>
      </td>
      <td className="py-[14px] px-3 font-inter text-sm text-white font-normal ">
        <div className="flex items-center gap-3 ">1900</div>
      </td>
      <td className="py-[14px] px-3 font-inter text-sm text-white font-normal ">
        <div className="flex items-center gap-3">2908</div>
      </td>
      <td className="py-[14px] px-3 font-inter text-sm text-white font-normal w-[99.79px]">
        <div className="flex items-end gap-3">
          <Icon icon="ri:more-line" width="24" height="24" color="#D9D9D9" />
        </div>
      </td>
    </tr>
  );
};

export default EngagementTableItem;
