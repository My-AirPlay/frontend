import React from "react";
import FeatureCard from "@/components/feature-card";

const FeaturesSection = () => {
  return (
    <section className="grid grid-cols-4 gap-x-11 gap-y-16 mb-56 container mx-auto">
      <FeatureCard />
      <div className="col-span-2 flex flex-col gap-16 items-center">
        <h2 className=" bg-gradient-to-r from-white to-custom-primary text-transparent inline-block bg-clip-text max-w-lg font-plus-jakarta-sans font-semibold text-[40px] text-center mx-auto">
          Discover our features, Let’s help you see The value we offer you
        </h2>
        <button className="w-full max-w-[250px] h-[50px] flex items-center justify-center rounded-full shadow-inner font-plus-jakarta-sans bg-custom-primary  font-medium  text-xl text-white">
          Get started
        </button>
      </div>
      <FeatureCard />
      <FeatureCard />
      <FeatureCard />
      <FeatureCard />
      <FeatureCard />
    </section>
  );
};

export default FeaturesSection;
