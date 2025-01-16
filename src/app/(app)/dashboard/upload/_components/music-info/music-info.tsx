import InputWrapper from "@/components/input-wrapper/input-wrapper";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import React, { useState } from "react";
import Preview from "../preview/preview";
import ArtistNameModal from "../artist-name-modal/artist-name-modal";

const MusicInfo = () => {
  const [showPreview, setShowPreview] = useState(false);
  const data = [
    [
      {
        title: "Title of Music/Album",
        value: "Artist",
      },
      {
        title: "Primary Artist Name",
        value: "Ashley",
      },
      {
        title: "Various Artists (Optional)",
        value: "Wes, Kimo, Drew",
      },
      {
        title: "Main Genre",
        value: "Gospel",
      },
      {
        title: "Secondary Genre (Optional)",
        value: "Christian",
      },
      {
        title: "Music Language",
        value: "English",
      },
      {
        title: "Release Date",
        value: "11 Dec, 2024",
      },
    ],
    [
      {
        title: "Release Year",
        value: "2024",
      },
      {
        title: "Music Description",
        value:
          "This track is inspired by '80s nostalgia and the feeling of chasing dreams through neon-lit nights.",
      },
    ],
  ];
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
            Song Title
          </label>
          <InputWrapper
            id="title"
            placeholder="Input title"
            styles="h-[64px]"
          />
        </fieldset>
        <fieldset className="flex flex-col gap-5">
          <label className="font-plus-jakarta-sans text-white font-semibold md:text-base">
            Artist Name
          </label>

          <ArtistNameModal />
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
          type="submit"
          onClick={() => setShowPreview(true)}
        >
          Track Upload <MoveRight />
        </Button>
      </form>
      {showPreview && (
        <Preview
          data={data}
          onContinue={() => {}}
          onEdit={() => setShowPreview(false)}
        />
      )}
    </div>
  );
};

export default MusicInfo;
