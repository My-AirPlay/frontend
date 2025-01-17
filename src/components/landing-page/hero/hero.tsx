import React from "react";
import heroBg from "@/app/assets/hero.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import circleImg from "@/app/assets/circle-btn.svg";
import elipseImg from "@/app/assets/elipse.svg";
const HeroSection = () => {
  return (
    <section className="grid-stack relative overflow-hidden">
      <figure>
        <Image src={heroBg} alt="airplay" className="w-full block" />
      </figure>
      <article className="container mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-plus-jakarta-sans font-bold text-[62px] md:max-w-[422px] text-white mb-12 flex flex-col">
              Empower your Music...
              <span className="max-w-[295px] md:hidden block text-white font-plus-jakarta-sans font-bold text-[62px]">
                own your journey
              </span>
            </h1>

            <div className="flex items-center gap-4 mb-14">
              <Button className="bg-transparent hover:bg-transparent text-custom-primary font-plus-jakarta-sans font-bold text-base border w-full max-w-[176px] border-custom-primary rounded-full">
                Request a Demo
              </Button>
              <Button className=" hover:bg-custom-primary text-white bg-custom-primary font-plus-jakarta-sans font-bold text-base border max-w-[176px] w-full border-custom-primary rounded-full">
                Get Started
              </Button>
            </div>

            <Image className="md:block hidden" src={circleImg} alt="" />
          </div>
          <div className="md:block hidden">
            <figure className="mb-[74px]">
              <Image src={elipseImg} alt="" />
            </figure>
            <h2 className="max-w-[295px] text-white font-plus-jakarta-sans font-bold text-[62px]">
              own your journey
            </h2>
          </div>
        </div>
      </article>
      <div
        className="absolute -left-[30px] bottom-[10px] h-[116px] bg-custom-banner_bg z-50"
        style={{
          rotate: "-2deg",
          width: "120svw",
        }}
      ></div>
    </section>
  );
};

export default HeroSection;
