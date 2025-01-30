import React from "react";
// import FeatureCard from "@/components/feature-card";
import { featureLgImages } from "@/lib/constants";
import Image from "next/image";

const FeaturesSection = () => {
  return (
    <section className="flex min-h[1128px] mb-16 items-center ">
      <div className="bg-custom-hero-card max-w-60 w-full p-7 rounded-md shadow-2xl -mr-10 z-50  h-4/5 flex flex-col gap-10">
        {featureLgImages.map((img, i) => (
          <figure key={i}>
            <Image src={img} alt="" />
          </figure>
        ))}
      </div>
      <div className="bg-custom-hero-card w-full p-7 rounded-md pl-28">
        <small className="text-custom-primary uppercase text-lg font-bold text-center block mb-2">
          Why AIRPLAY
        </small>
        <h2 className="text-white font-bold text-5xl text-center mb-5">
          Explore our Features
        </h2>
        <div className="flex flex-col gap-5">
          {/* {landingPageFeatures.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))} */}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
