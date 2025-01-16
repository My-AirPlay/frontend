import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { MediaCardProps } from "../media-type/media-type.interface";
import Image from "next/image";

const MediaCard = ({
  author,
  title,
  fallbackIcon = "mdi:music",
  img,
}: MediaCardProps) => {
  return (
    <article>
      <div className="w-full bg-[#3F3F3F] rounded-[20px] aspect-square grid-stack ">
        <figure className="grid place-items-center">
          {img ? (
            <Image src={img} alt={title} />
          ) : (
            <Icon
              color="#C1C1C1"
              icon={fallbackIcon}
              width="136"
              height="136"
            />
          )}
        </figure>
        <div className="px-3 py-[14px]">
          <Icon
            icon="material-symbols:more-vert"
            width="24"
            height="24"
            color="white"
          />
        </div>
      </div>
      <h3 className="text-white font-bold font-plus-jakarta-sans text-lg mt-[6px]">
        {title}
      </h3>
      <div className="text-white/45 flex items-center gap-1 mt-2">
        <Icon icon="bx:disc" width="15" height="15" color="white" />
        <small className="text-white/45 font-normal text-[17px] font-plus-jakarta-sans">
          {author}
        </small>
      </div>
    </article>
  );
};

export default MediaCard;
