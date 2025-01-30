import CustomSelect from "@/components/custom-dropdown/custom-select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const PaginationBar = () => {
  return (
    <div className="mt-10 px-8 flex justify-between flex-col md:flex-row items-center gap-4">
      <div className="flex items-center gap-5">
        <Button className="border-white bg-transparent hover:bg-transparent border  w-fit p-2 text-custom-engagement-boder">
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <small className="font-inter text-white font-normal text-base">
          1 <span className="text-custom-primary">/ 16</span>
        </small>
        <Button className="border-white bg-transparent hover:bg-transparent border  w-fit p-2 text-custom-engagement-boder">
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
      <div className="flex gap-3 items-center ">
        <small className="font-plus-jakarta-sans text-white font-normal text-xs whitespace-nowrap">
          Rows per page
        </small>
        <CustomSelect
          options={[
            {
              label: "10",
              value: "10",
            },
          ]}
          placeholder="10"
          styles="h-10 max-w-[100px] w-full"
        />
      </div>
    </div>
  );
};

export default PaginationBar;
