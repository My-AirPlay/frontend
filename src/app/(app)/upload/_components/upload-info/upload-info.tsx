import React from "react";
import uploadPlacholder from "@/app/assets/upload-placeholder-sm.svg";
import Image from "next/image";
interface UploadInfoProps {
  artsitName: string;
  songName: string;
  img?: string;
}
const UploadInfo = ({ artsitName, songName, img }: UploadInfoProps) => {
  return (
    <div className="py-2 px-[10px] flex items-center gap-5 mb-10">
      {img ? (
        <Image
          src={img}
          alt={artsitName}
          className="w-full max-w-[100px] aspect-square  rounded-[14px]"
          width={100}
          height={100}
        />
      ) : (
        <figure className="p-2 rounded-[14px] border-[2.9px] border-dashed border-[#7B7B7B] grid place-items-center">
          <Image src={uploadPlacholder} alt="" />
        </figure>
      )}

      <p className="text-custom-primary font-extrabold font-poppins text-[22px] flex flex-col">
        {songName}
        <span className="text-white font-normal text-[21px]">
          by {artsitName}
        </span>
      </p>
    </div>
  );
};

export default UploadInfo;
