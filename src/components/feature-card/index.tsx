import Image, { StaticImageData } from "next/image";
import React from "react";
export interface FeatureCardProps {
  background: StaticImageData;
  icon: StaticImageData;
  title: string;
  descriptions: string;
}
const FeatureCard = ({
  background,
  descriptions,
  icon,
  title,
}: FeatureCardProps) => {
  return (
    <div className="bg-gradient-to-br from-white to-custom-primary flex flex-col overflow-hidden rounded-[36px] p-[1px]">
      <article
        style={{
          backgroundImage: `url(${background.src})`,
        }}
        className="  overflow-hidden flex-1 flex flex-col "
      >
        <div className="bg-custom-background/70 gap-3 items-center flex flex-col justify-center flex-1 py-3">
          <figure>
            <Image src={icon} alt={title} />
          </figure>
          <p className="font-bold font-plus-jakarta-sans text-25  text-white">
            {title}
          </p>
          <p className="font-normal font-plus-jakarta-sans  text-lg text-center text-white">
            {descriptions}
          </p>
        </div>
      </article>
    </div>
  );
};

export default FeatureCard;
