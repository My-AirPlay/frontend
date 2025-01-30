import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const DateToggle = () => {
  return (
    <div className="flex justify-center items-center md:gap-10 gap-3 mb-5">
      <Button className="border-white bg-transparent hover:bg-transparent border max-w-8 aspect-square p-0  md:p-2 text-custom-engagement-boder">
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <Button className="bg-transparent hover:bg-transparent hover:text-cus  w-fit p-2 text-custom-engagement-boder font-inter font-normal text-sm">
        2021
      </Button>
      <Button className="bg-transparent hover:bg-transparent hover:text-cus  w-fit p-2 text-custom-engagement-boder font-inter font-normal text-sm">
        2024
      </Button>
      <Button className="bg-transparent hover:bg-transparent hover:text-cus  w-fit p-2 text-custom-engagement-boder font-inter font-normal text-sm">
        2023
      </Button>
      <Button className="bg-transparent hover:bg-transparent hover:text-cus  w-fit p-2 text-custom-primary font-inter font-normal text-sm">
        2024
      </Button>
      <Button className="border-white bg-transparent hover:bg-transparent border  w-fit p-2 text-custom-engagement-boder">
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default DateToggle;
