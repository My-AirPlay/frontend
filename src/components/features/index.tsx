import React from "react";
import FeatureCard, { FeatureCardProps } from "@/components/feature-card";
import uploadIcon from "@/app/assets/feature-icons/upload.svg";
import analyticsIcon from "@/app/assets/feature-icons/analytics.svg";
import smartlinkIcon from "@/app/assets/feature-icons/smartlink.svg";
import swiftIcon from "@/app/assets/feature-icons/swift.svg";
import statisticsIcon from "@/app/assets/feature-icons/statistics.svg";
import uploadBg from "@/app/assets/features/upload.png";
import analyticsBg from "@/app/assets/features/analytics.png";
import smartlinkBg from "@/app/assets/features/smartlink.png";
import swiftBg from "@/app/assets/features/swift.png";
import statisticsBg from "@/app/assets/features/statistics.png";

const fetures: FeatureCardProps[] = [
  {
    background: uploadBg,
    descriptions:
      "Upload tracks with support for multiple formats, ensuring seamless distribution to all major platforms ",
    icon: uploadIcon,
    title: "Music Uploads",
  },
  {
    background: uploadBg,
    descriptions:
      "Upload high-quality videos to showcase your music and engage your audience across top streaming platforms",
    icon: uploadIcon,
    title: "Video Uploads",
  },
  {
    background: analyticsBg,
    descriptions:
      "Track your revenue, streaming stats, and audience insights in real-time ",
    icon: analyticsIcon,
    title: "Earnings & Analytics",
  },
  {
    background: smartlinkBg,
    descriptions:
      "Customized, shareable links that connect your audience directly to your music across all major streaming platforms ",
    icon: smartlinkIcon,
    title: "Sharable Smart Link ",
  },
  {
    background: swiftBg,
    descriptions:
      "Get started in minutes with a simple, user-friendly setup process designed to get your music out to the world faster",
    icon: swiftIcon,
    title: "Swift Onboarding",
  },
  {
    background: statisticsBg,
    descriptions:
      "Stay updated with daily insights on your streams, audience engagement, and earnings",
    icon: statisticsIcon,
    title: "Daily Statistics",
  },
];
const FeaturesSection = () => {
  return (
    <section className="grid grid-cols-4 gap-x-11 gap-y-16 mb-56 container mx-auto">
      <FeatureCard {...fetures[0]} />
      <div className="col-span-2 flex flex-col gap-16 items-center">
        <h2 className=" bg-gradient-to-r from-white to-custom-primary text-transparent inline-block bg-clip-text max-w-lg font-plus-jakarta-sans font-semibold text-[40px] text-center mx-auto">
          Discover our features, Let’s help you see The value we offer you
        </h2>
        <button className="w-full max-w-[250px] h-[50px] flex items-center justify-center rounded-full shadow-inner font-plus-jakarta-sans bg-custom-primary  font-medium  text-xl text-white">
          Get started
        </button>
      </div>

      {fetures.slice(1).map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </section>
  );
};

export default FeaturesSection;
