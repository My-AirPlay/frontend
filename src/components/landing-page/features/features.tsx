import React from "react";
import { landingPageFeatures } from "@/lib/constants";
import FeatureCard from "./features-card";
import { Button } from "@/components/ui/button";
const FeaturesSection = () => {
  const firstFeature = landingPageFeatures[0];
  return (
    <section className="grid-cols-1 container mx-auto  grid md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
      <FeatureCard {...firstFeature} />

      <article className="lg:col-span-2 md:col-span-3 lg:row-span-1 row-first  flex items-center flex-col gap-[64px]">
        <h2 className=" text-center bg-gradient-to-br from-white to-custom-primary bg-clip-text text-transparent text-40">
          Discover our features, <br /> Let’s help you see <br /> The value we
          offer you
        </h2>
        <Button className=" btn-inner-shadow hover:bg-custom-primary text-white bg-custom-primary font-plus-jakarta-sans font-bold text-base border max-w-[176px] w-full border-custom-primary rounded-full ">
          Get Started
        </Button>
      </article>

      {landingPageFeatures.slice(1).map((features) => (
        <FeatureCard key={features.title} {...features} />
      ))}
    </section>
  );
};

export default FeaturesSection;
