import TextareaWrapper from "@/components/text-area-wrapper/text-area-wrapper";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import React from "react";

const EnquiryModal = () => {
  return (
    <div>
      <h1 className="text-custom-primary  p-[10px] font-inter text-xl mx-auto w-fit mb-2">
        ENQUIRES
      </h1>
      <p className="max-w-[682px] mx-auto font-inter text-center md:text-start text-lg text-white mb-9">
        We value your interest and involvement in AirPlay community. Whether you
        have questions, need support, or want to get more involved, we&apos;re
        here to help.
      </p>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-10 max-w-[628.57px] mx-auto"
      >
        <TextareaWrapper placeholder="Your Message" />
        <Button className="mx-auto" size={"lg"}>
          Submit <MoveRight />
        </Button>
      </form>
    </div>
  );
};

export default EnquiryModal;
