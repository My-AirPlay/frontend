import Image from "next/image";
import React from "react";
import spotifyImg from "@/app/assets/spotify.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@/components/ui/button";
const PreferenceCard = () => {
  return (
    <article className="rounded-tr-[40px] rounded-bl-[40px] pb-6 bg-custom-page-bg overflow-hidden preference-card-shadow ">
      <figure className="rounded-br-2xl overflow-hidden">
        <Image src={spotifyImg} alt="Spotify" className="w-full" />
      </figure>
      <div className="px-5">
        <div className="flex items-center gap-1 mb-[6px]">
          <div className="w-5 h-5 bg-custom-check-box border border-white rounded-sm grid place-items-center">
            <Icon
              icon="material-symbols:check-rounded"
              width="16"
              height="16"
              color="#fff"
            />
          </div>
          <p className="font-plus-jakarta-sans font-bold text-white text-lg">
            Spotify Music
          </p>
        </div>
        <div className="flex items-center gap-1 mb-4">
          <Icon
            icon="flowbite:thumbs-up-solid"
            width="16"
            height="16"
            className="text-custom-primary"
          />
          <p className="text-white/70 font-inter font-normal text-xs">
            Recommend Platform
          </p>
        </div>
        <Button
          size={"lg"}
          className="h-[33px] font-inter font-medium text-[13px]"
        >
          Disable for me
        </Button>
      </div>
    </article>
  );
};

export default PreferenceCard;
