import InputWrapper from "@/components/input-wrapper/input-wrapper";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import React from "react";
import ArtistType from "./artist-type/artist-type";
import { Button } from "@/components/ui/button";
import spotifyLogo from "@/app/assets/spotify-logo.svg";
import appleMusicLogo from "@/app/assets/apple-music-logo.png";
import soundCloudLogo from "@/app/assets/sound-cloud-logo.png";
import Image from "next/image";
import CustomSelect from "@/components/custom-dropdown/custom-select";
const ArtistNameModal = () => {
  return (
    <Dialog>
      <DialogTrigger
        type="button"
        className="h-[64px] text-[#FCFCFC] bg-[#7B7B7B] hover:bg-[#7B7B7B] text-start px-3 rounded-lg"
      >
        Add Name
      </DialogTrigger>
      <DialogContent className="bg-[#222222] w-full max-w-[1000px] border-none max-h-[80vh] overflow-y-auto">
        <DialogTitle className="font-plus-jakarta-sans font-extrabold text-white text-[26px]">
          Add Artist Name
        </DialogTitle>
        <DialogDescription className="font-plus-jakarta-sans font-medium text-sm text-white">
          All fields are required unless noted otherwise
        </DialogDescription>
        <section className="flex flex-col gap-6 pb-6 border-b borde-b-[#D4D4D4]">
          <fieldset className="flex flex-col gap-5">
            <label
              className="font-plus-jakarta-sans text-white font-semibold md:text-base"
              htmlFor="artist_name"
            >
              Artist Name
            </label>
            <InputWrapper
              id="artist_name"
              placeholder="Input name"
              styles="h-[64px]"
            />
          </fieldset>
          <fieldset className="flex flex-col gap-5">
            <label
              className="font-plus-jakarta-sans text-white font-semibold md:text-base"
              htmlFor="artist_type"
            >
              Artist Type
            </label>
            <ArtistType />
          </fieldset>

          <Button
            size={"lg"}
            className="max-w-[275px] h-[75px] mx-auto"
          >
            Search
          </Button>
        </section>
        <section className="flex flex-col gap-6">
          <div>
            <p className="font-plus-jakarta-sans font-extrabold text-white text-[26px]">
              We found the following store profile matching “john doe”
            </p>
            <p className="font-plus-jakarta-sans font-medium text-sm text-white">
              Kindly confirm or deny your identity by selecting from the options
              below. If none of the options match your profile, please select
              “Not my profile” below and the store link will be generated for
              you auto matically.
            </p>
          </div>
          <div className="border border-[#D4D4D4] rounded-2xl ">
            <fieldset className="p-4 flex gap-4 items-center">
              <figure>
                <Image src={spotifyLogo} alt="" />
              </figure>
              <CustomSelect options={[]} placeholder="Select your profile" />
            </fieldset>
            <fieldset className="p-4 flex gap-4 items-center">
              <figure>
                <Image src={appleMusicLogo} alt="" />
              </figure>
              <CustomSelect options={[]} placeholder="Select your profile" />
            </fieldset>
            <fieldset className="p-4 flex gap-4 items-center">
              <figure>
                <Image src={soundCloudLogo} alt="" />
              </figure>
              <CustomSelect options={[]} placeholder="Select your profile" />
            </fieldset>
          </div>
          <div className="flex items-center justify-center gap-[76px]">
            <Button
              size={"lg"}
              className="max-w-[275px] h-[75px] mx-auto bg-transparent border border-white"
            >
              Reset
            </Button>
            <Button
              size={"lg"}
              className="max-w-[275px] h-[75px] mx-auto"
            >
              Confirm Selection
            </Button>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default ArtistNameModal;
