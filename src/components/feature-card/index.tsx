import Image, { StaticImageData } from "next/image";
import React from "react";
export interface FeatureCardProps {
  img: StaticImageData;
  title: string;
  descriptions: string;
}
const FeatureCard = ({ descriptions, img, title }: FeatureCardProps) => {
  return (
    <article className="bg-custom-features-card rounded-[20px] p-7  flex items-start gap-8">
      <figure className="basis-14 flex-1">
        <Image src={img} alt="" className="w-[50px]" />
      </figure>
      <div className="max-w-[807px] w-fit">
        <h3 className="font-manrope font-extrabold text-2xl text-white mb-2">
          {title}
        </h3>
        <p className="font-manrope text-lg font-normal leading-8 tracking-tight text-white">
          {descriptions}
        </p>
      </div>
    </article>
  );
};

export default FeatureCard;
