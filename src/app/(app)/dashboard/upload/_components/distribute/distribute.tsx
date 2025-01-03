import Image from "next/image";
import React from "react";
import uploadPlaceholder from "@/app/assets/upload-placeholder.png";
import { Button } from "@/components/ui/button";

const Distribute = () => {
  return (
    <div className="mt-20">
      <h2 className="text-custom-primary font-inter font-semibold text-xl text-center p-[10px] mb-2">
        Preview/ Distribute
      </h2>
      <p className="text-center font-plus-jakarta-sans font-medium text-sm text-white mb-12">
        Here is how your album will be displayed on DSP platforms.
        <br />
        If you see any errors, please go back to the checklist above to edit
        each step. You will not be able to make any changes once your album is
        distributed.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="h-[344] max-w-[452px] border-4 border-dashed border-custom-primary aspect-square rounded-[14.28px] w-full grid place-items-center cursor-pointer relative">
          <Image src={uploadPlaceholder} alt="" />
        </div>
        <div className="bg-[#3838384f] rounded-[20px] upload-preference-shadow px-5 py-3 mt-[70px] mb-10">
          <p className="font-poppins text-[21px] font-regular text-white mb-5">
            <span className="font-extrabold text-custom-primary text-[22px]">
              God is Good
            </span>
            <br />
            by Ashley
          </p>
          <ul className="flex flex-col gap-2">
            <li className="font-plus-jakarta-sans text-base text-white font-semibold">
              <span className="font-light text-white/70">Released year:</span>{" "}
              2024
            </li>
            <li className="font-plus-jakarta-sans text-base text-white font-semibold">
              <span className="font-light text-white/70">
                {" "}
                Distribution year:
              </span>{" "}
              2024
            </li>
            <li className="font-plus-jakarta-sans text-base text-white font-semibold">
              <span className="font-light text-white/70"> Artist Name:</span>{" "}
              Ashley
            </li>
            <li className="font-plus-jakarta-sans text-base text-white font-semibold">
              <span className="font-light text-white/70"> Genres:</span>{" "}
              Christian/Gospel
            </li>
            <li className="font-plus-jakarta-sans text-base text-white font-semibold">
              <span className="font-light text-white/70"> Released Date:</span>{" "}
              Feb 2025
            </li>
            <li className="font-plus-jakarta-sans text-base text-white font-semibold">
              <span className="font-light text-white/70"> Length: </span> 0:00
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-between items-center max-w-[950px] mx-auto  gap-12 w-full md:flex-row flex-col mt-16">
        <Button
          variant={"authBtn"}
          className="max-w-[275px] bg-transparent border-2 border-white h-[75px] "
          type="button"
        >
          Distribution Preferences
        </Button>
        <Button
          variant={"authBtn"}
          type="submit"
          className="max-w-[275px] h-[75px] "
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Distribute;
