import hero from "@/app/assets/hero.png";
import logo from "@/app/assets/logo-big.svg";
import Link from "next/link";
import CtaBtns from "@/app/(auth)/_components/cta-btn";
import circle from "@/app/assets/circle-btn.svg";
import elipse from "@/app/assets/elipse.svg";
import Image from "next/image";
import React from "react";
const bannerTexts = [
  " Music Uploads",
  "Music Royalties",
  "Distributions",
  "Reports and Analytics",
];
const HeroSection = () => {
  return (
    <header
      className="relative pb-20 mb-40 bg-cover "
      style={{
        backgroundImage: `url(${hero.src})`,
      }}
    >
      <section className="relative z-50 pt-5">
        <div className="container mx-auto ">
          <div className="flex justify-between items-start mb-6">
            <nav className="w-full max-w-md ">
              <ul className="flex justify-between gap-4">
                <li className="font-medium text-white text-base">
                  <Link href={"#"}>Features</Link>
                </li>
                <li className="font-medium text-white text-base">
                  <Link href={"#"}>About Us</Link>
                </li>
                <li className="font-medium text-white text-base">
                  <Link href={"#"}>Contact Us</Link>
                </li>
              </ul>
            </nav>
            <Link href={"/"}>
              <Image alt="airplay" src={logo} />
            </Link>
            <CtaBtns />
          </div>
          <div className="flex justify-between ">
            <div className="flex flex-col">
              <h2 className="font-plus-jakarta-sans font-semibold text-6xl max-w-96 mb-12 text-white">
                Empower your Music...
              </h2>
              <CtaBtns />
              <figure className="mt-14">
                <Image alt="" src={circle} />
              </figure>
            </div>
            <div className="flex flex-col items-end justify-between">
              <figure className="self-end mb-20">
                <Image src={elipse} alt="" />
              </figure>
              <h2 className="font-plus-jakarta-sans font-semibold text-6xl max-w-96 mb-12 text-white">
                own your journey
              </h2>
            </div>
          </div>
        </div>
      </section>
      <div className="h-[116px] flex justify-center items-center  absolute z-50 rotate-[176deg] bg-custom-banner_bg -translate-x-4 -bottom-[9%] w-[120%]">
        <ul
          className=" w-svw flex items-center gap-14"
          style={{
            rotate: "180deg",
          }}
        >
          {bannerTexts.map((text) => (
            <li
              className="font-plus-jakarta-sans font-medium text-white text-30 "
              key={text}
            >
              {text}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default HeroSection;
