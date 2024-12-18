// import { urls } from "@/lib/constants";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React from "react";

const DashboardPage = () => {
  const links = [
    {
      title: "Upload Music",
      icon: "ic:baseline-upload",
      route: "",
    },
    {
      title: "My Catalog",
      icon: "ri:disc-fill",
      route: "",
    },
    {
      title: "Royalties",
      icon: "solar:dollar-broken",
      route: "",
    },
    {
      title: "Support",
      icon: "ic:baseline-support-agent",
      route: "",
    },
  ];
  return (
    <>
      <h1 className="font-plus-jakarta-sans text-white font-semibold text-2xl md:my-11 my-[55px]">
        Dashboard Overview
      </h1>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-[68px] md:gap-5 gap-y-10 ">
        {links.map((link) => (
          <Link
            href={link.route || "#"}
            key={link.title}
            className="flex flex-col items-center"
          >
            <div className="text-white w-full max-w-[152px] aspect-square bg-custom-primary grid  rounded-full place-items-center mb-[29px]">
              <Icon icon={link.icon} width="100" height="100" />
            </div>
            <small className="font-plus-jakarta-sans text-white font-bold text-xl">
              {link.title}
            </small>
          </Link>
        ))}
      </section>
      <section>
        <article>
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-roboto font-black text-2xl text-white">
              Terms and conditions
            </h2>
            <small className="font-roboto text-[17px] text-custom-primary md:block hidden font-medium">
              Collapse
            </small>
          </div>
          <p className="text-custom-footer_border font-roboto leading-6 text-xl font-medium mb-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <Link
            href={"#"}
            className="text-custom-primary pb-[1px] block border-dashed border-b-2 border-b-custom-primary w-fit font-roboto"
          >
            Click to see the full terms and conditions
          </Link>
        </article>
        <div className="w-[95%] border-t my-5 border-t-custom-seperator mx-auto " />
        <article>
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-roboto font-black text-2xl text-white">
              Privacy and policy of website
            </h2>
            <small className="font-roboto text-[17px] text-custom-primary md:block hidden font-medium">
              Collapse
            </small>
          </div>
          <p className="text-custom-footer_border font-roboto leading-6 text-xl font-medium mb-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <Link
            href={"#"}
            className="text-custom-primary pb-[1px] block border-dashed border-b-2 border-b-custom-primary w-fit font-roboto"
          >
            Click to see the full terms and conditions
          </Link>
        </article>
      </section>
    </>
  );
};

export default DashboardPage;
