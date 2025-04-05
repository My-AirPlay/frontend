import React from "react";
import InputWrapper from "@/components/input-wrapper/input-wrapper";
import TextareaWrapper from "@/components/text-area-wrapper/text-area-wrapper";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
const ContactModal = () => {
  return (
    <div className="">
      <h1 className="text-custom-primary  p-[10px] font-inter text-xl mx-auto w-fit mb-2">
        CONTACT US
      </h1>
      <p className="max-w-[682px] mx-auto font-inter text-center md:text-start text-lg text-white mb-9">
        We value your interest and involvement in AirPlay community. Whether you
        have questions, need support, or want to get more involved, we&apos;re
        here to help.
        <span className="text-white text-lg font-inter  font-normal">
          Contact Number :{" "}
          <span className="text-custom-primary">+23456789089</span>
        </span>
      </p>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-6 max-w-[628.57px] mx-auto"
      >
        <InputWrapper placeholder="Your Name" />
        <InputWrapper placeholder="Your Email" />
        <TextareaWrapper placeholder="Your Message" />
        <Button className="mx-auto" type="submit" size={"lg"}>
          Submit <MoveRight />
        </Button>
      </form>
    </div>
  );
};

export default ContactModal;
