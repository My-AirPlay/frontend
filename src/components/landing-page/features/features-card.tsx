import Image, { StaticImageData } from "next/image";
import React from "react";

export interface FeatureCardProps {
  background: StaticImageData;
  icon: StaticImageData;
  title: string;
  description: string;
}
const FeatureCard = ({
  background,
  description,
  icon,
  title,
}: FeatureCardProps) => {
  return (
    <article className="bg-gradient-to-r from-white to-custom-primary p-[1px] rounded-[32px] overflow-hidden">
      <div className="grid-stack h-full">
        <figure>
          <Image src={background} alt={title} className="w-full h-full" />
        </figure>
        <div className="bg-black/50 flex flex-col items-center px-1 py-3">
          <Image src={icon} alt={title} className="mb-[19px]" />
          <h3 className=" font-plus-jakarta-sans font-bold text-25 text-white text-center mb-[11px]">
            {title}
          </h3>
          <p className="font-plus-jakarta-sans text-center text-lg text-white">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
};

export default FeatureCard;
