import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const ArtistType = () => {
  return (
    <Select>
      <SelectTrigger className="w-full rounded-[16px] h-[64px] bg-[#383838] flex justify-between items-center font-plus-jakarta-sans font-normal text-base text-[#A6A6A6] border-none">
        <SelectValue placeholder="Select an artist type" />
      </SelectTrigger>
      <SelectContent className="bg-[#383838] border-none">
        <SelectItem value="single">Single</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ArtistType;
