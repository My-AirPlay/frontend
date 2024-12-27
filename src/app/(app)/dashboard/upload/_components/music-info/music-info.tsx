import InputWrapper from "@/components/input-wrapper/input-wrapper";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import React from "react";

const MusicInfo = () => {
  return (
    <div>
      <h2 className="p-[10px] w-fit mx-auto font-inter font-semibold text-xl text-custom-primary mb-2">
        Music Info
      </h2>
      <p className="font-plus-jakarta-sans mb-10 font-normal text-base text-white max-w-[990px] mx-auto">
        Please use your real name and data. It will be used for security
        purposes to make sure you and only you have access to your account
        including withdrawals (if applicable).{" "}
        <span className="text-custom-primary">
          * All fields are mandatory unless specified otherwise.
        </span>
      </p>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-5"
      >
        <fieldset className="flex flex-col gap-5">
          <label
            className="font-plus-jakarta-sans text-white font-semibold md:text-base"
            htmlFor="title"
          >
            Title of Music/ Album
          </label>
          <InputWrapper
            id="title"
            placeholder="Input title"
            styles="h-[64px]"
          />
        </fieldset>
        <fieldset className="flex flex-col gap-5">
          <label
            className="font-plus-jakarta-sans text-white font-semibold md:text-base"
            htmlFor="primary_name"
          >
            Primary Artist Name
          </label>
          <InputWrapper
            id="primary_name"
            placeholder="Input Name"
            styles="h-[64px]"
          />
        </fieldset>
        <fieldset className="flex flex-col gap-5">
          <label
            className="font-plus-jakarta-sans text-white font-semibold md:text-base"
            htmlFor="various_artist"
          >
            Various Artists (Optional)
          </label>
          <InputWrapper
            id="various_artist"
            placeholder="Select Various Artists if you have more than 4 on your track"
            styles="h-[64px]"
          />
        </fieldset>
        <div className="grid md:grid-cols-2 gap-5 md:gap-10 lg:gap-14">
          <fieldset className="flex flex-col gap-5">
            <label
              className="font-plus-jakarta-sans text-white font-semibold md:text-base"
              htmlFor="main_genre"
            >
              Main Genre
            </label>
            <InputWrapper
              id="main_genre"
              placeholder="What is the genre of your music?"
              styles="h-[64px]"
            />
          </fieldset>
          <fieldset className="flex flex-col gap-5">
            <label
              className="font-plus-jakarta-sans text-white font-semibold md:text-base"
              htmlFor="secondary_genre"
            >
              Secondary Genre (Optional)
            </label>
            <InputWrapper
              id="secondary_genre"
              placeholder="Select a secondary genre"
              styles="h-[64px]"
            />
          </fieldset>
        </div>
        <fieldset className="flex flex-col gap-5">
          <label
            className="font-plus-jakarta-sans text-white font-semibold md:text-base"
            htmlFor="language"
          >
            Language of Music
          </label>
          <InputWrapper id="language" placeholder="English" styles="h-[64px]" />
        </fieldset>
        <fieldset className="flex flex-col gap-5">
          <label
            className="font-plus-jakarta-sans text-white font-semibold md:text-base"
            htmlFor="release_date"
          >
            Release Date
          </label>
          <InputWrapper
            id="release_date"
            placeholder="Input Name"
            styles="h-[64px]"
          />
        </fieldset>
        <fieldset className="flex flex-col gap-5">
          <label
            className="font-plus-jakarta-sans text-white font-semibold md:text-base"
            htmlFor="release_yaer"
          >
            Release Year
          </label>
          <InputWrapper
            id="release_yaer"
            placeholder="Select same as release date if they are the same year "
            styles="h-[64px]"
          />
        </fieldset>
        <fieldset className="flex flex-col gap-5 mb-10">
          <label
            className="font-plus-jakarta-sans text-white font-semibold md:text-base"
            htmlFor="main_desc"
          >
            Music Description
          </label>
          <InputWrapper
            id="main_desc"
            placeholder="Select same as release date if they are the same year "
            styles="h-[64px]"
          />
        </fieldset>
        <Button
          variant={"authBtn"}
          className="w-full max-w-[275px] mx-auto h-auth-btn"
        >
          Track Upload <MoveRight />
        </Button>
      </form>
    </div>
  );
};

export default MusicInfo;
