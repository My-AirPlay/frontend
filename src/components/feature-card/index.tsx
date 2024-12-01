import Image from "next/image";
import React from "react";
import uploadBg from "@/app/assets/features/upload.png";
import uploadIcon from "@/app/assets/feature-icons/upload.svg";
const FeatureCard = () => {
  return (
    <article className="grid-stack rounded-[36px] overflow-hidden bg-gradient-to-br from-white to-custom-primary p-[1px]">
      <figure>
        <Image src={uploadBg} alt="" className="w-full" />
      </figure>
      <div className="bg-custom-background/70 gap-3 items-center flex flex-col justify-center">
        <figure>
          <Image src={uploadIcon} alt="" />
        </figure>
        <p className="font-bold font-plus-jakarta-sans text-25  text-white">
          Music Uploads
        </p>
        <p className="font-normal font-plus-jakarta-sans  text-lg text-center text-white">
          Upload tracks with support for multiple formats, ensuring seamless
          distribution to all major platforms
        </p>
      </div>
    </article>
  );
};

export default FeatureCard;
