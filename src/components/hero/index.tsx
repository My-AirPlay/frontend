import heorImg from "@/app/assets/landing-page.png";
import { urls } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <section className="flex justify-between mb-14">
      <div className="max-w-[626px] flex flex-col justify-between">
        <div>
          <h1 className="font-bold text-50 text-white">
            Empower your Music, Own your Journey.
          </h1>
          <p className="font-normal text-28 text-white ">
            Seamlessly Track, Manage, and Maximize Your Music Royalties with
            Transparent Insights and Fair Compensation — Because Every Play
            Deserves to Pay.
          </p>
        </div>
        <Link
          className="text-custom-primary font-plus-jakarta-sans font-bold text-base"
          href={urls.register}
        >
          Create an Account
        </Link>
      </div>
      <figure>
        <Image src={heorImg} alt="" />
      </figure>
    </section>
  );
};

export default HeroSection;
