import React from "react";
import uploadImg from "@/app/assets/upload-music-placeholder.png";
import Image from "next/image";
import InputWrapper from "@/components/input-wrapper/input-wrapper";
import PreferenceCard from "./preference-card/preference-card";
import { Button } from "@/components/ui/button";
const UploadPreference = () => {
  return (
    <div>
      <h2 className="text-custom-primary font-inter font-semibold text-xl text-center p-[10px] mb-2">
        Distribution Preferences
      </h2>
      <div className="w-full max-w-[277px] mx-auto p-[10px] flex items-center gap-5">
        <figure>
          <Image src={uploadImg} alt="upload music" />
        </figure>
        <p className="font-poppins text-[21px] font-regular text-white">
          <span className="font-extrabold text-custom-primary text-[22px]">
            God is Good
          </span>
          <br />
          by Ashley
        </p>
      </div>

      <div className="bg-[#3838384f] rounded-[20px] upload-preference-shadow px-2 py-1 mt-[70px] mb-10">
        <div className="bg-custom-page-bg rounded-md ">
          <h3 className="p-[10px] mb-2 text-center font-plus-jakarta-sans font-semibold text-xl text-custom-primary">
            Release Date
          </h3>
          <div className="flex flex-col gap-12 pb-5">
            <p className="font-plus-jakarta-sans text-base text-white font-regular px-2">
              <span className="font-semibold text-custom-primary">
                Release Date:{" "}
              </span>
              You should set the release date at least 21 days in the future.
              This will give you enough time to announce the release to your
              fans, share the pre-save, and pitch the release to the DSP’s for
              play listing. It will also allow you to make any changes requested
              by our approval team..
            </p>
            <p className="font-plus-jakarta-sans text-base text-white font-regular px-2">
              <span className="font-semibold text-custom-primary">
                Release Time:
              </span>
              Your Release will be available starting at 12am for each
              territory. Most stores also allow you to select the availability
              time settings for your release.
            </p>
            <p className="font-plus-jakarta-sans text-base text-white font-regular px-2">
              <span className="font-semibold text-custom-primary">
                Important:
              </span>
              As Apple does not allow timed releases, your album will be
              available at 12am for each country on Apple Music and iTunes.
            </p>
          </div>
        </div>
      </div>

      <form className="">
        <div className="flex flex-col gap-5 mb-9">
          <fieldset className="flex flex-col gap-5">
            <label
              className="font-plus-jakarta-sans text-white font-semibold label
           md:text-base"
              htmlFor="title"
            >
              Release Date
            </label>
            <InputWrapper id="title" styles="h-[64px]" />
          </fieldset>
          <fieldset>
            <input type="checkbox" />
            <label
              className="font-plus-jakarta-sans text-white font-semibold label
           md:text-base"
            >
              {" "}
              My release date is different than original release date
            </label>
          </fieldset>
          <fieldset className="flex flex-col gap-5">
            <label
              className="font-plus-jakarta-sans text-white font-semibold label
           md:text-base"
              htmlFor="original_release_date"
            >
              Original Release Date
            </label>
            <InputWrapper id="original_release_date" styles="h-[64px]" />
          </fieldset>
        </div>
        <h2 className="font-plus-jakarta-sans font-bold text-xl text-custom-primary p-[10px] mb-2">
          Store Distribution
        </h2>
        <p className="text-white font-plus-jakarta-sans font-normal text-base mb-11">
          All stores are selected by default. Toggle each store to select or
          deselect individually.
        </p>
        <div className="border-t border-t-custom-primary mb-[42px]" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[45px]">
          <PreferenceCard />
          <PreferenceCard />
          <PreferenceCard />
          <PreferenceCard />
          <PreferenceCard />
          <PreferenceCard />
          <PreferenceCard />
          <PreferenceCard />
        </div>

        <div className="flex justify-between items-center max-w-[950px] mx-auto  gap-12 w-full md:flex-row flex-col mt-16">
          <Button
            variant={"authBtn"}
            className="max-w-[275px] bg-transparent border-2 border-white h-[75px] "
            type="button"
          >
            Music Cover
          </Button>
          <Button
            variant={"authBtn"}
            type="submit"
            className="max-w-[275px] h-[75px] "
          >
            Preview
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UploadPreference;
