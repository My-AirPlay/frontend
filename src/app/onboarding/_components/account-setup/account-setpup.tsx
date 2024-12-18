import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import artistImg from "@/app/assets/artist.png";

const AccountSetup = () => {
  return (
    <div>
      <h1 className="font-inter text-center text-custom-primary md:text-xl text-lg mb-2 font-normal">
        ACCOUNT SETUP
      </h1>
      <p className="font-inter font-semibold md:text-28 text-2xl text-center mb-[100px] text-white">
        I am signing up as:
      </p>

      <figure className="border-[5px] border-custom-primary mb-[60px] flex flex-col gap-2 w-fit mx-auto">
        <Image src={artistImg} alt="" />
        <figcaption className="font-inter text-white text-xl md:text-28 text-center">
          An Artist
        </figcaption>
      </figure>
      <Button variant={"authBtn"} className="max-w-[275px] h-[75px] mx-auto">
        Continue <MoveRight />
      </Button>
      <div className="min-h-[91px]" />
    </div>
  );
};

export default AccountSetup;
