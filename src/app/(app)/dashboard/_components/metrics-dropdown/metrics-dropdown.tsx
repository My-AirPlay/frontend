import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { metricsDate } from "@/lib/constants";
import React from "react";

const MetricsDropdown = () => {
  return (
    <Select>
      <SelectTrigger
        className="max-w-[94px] rounded-[9px] w-full h-9 flex items-center justify-center bg-custom-dropdown-bg
        font-plus-jakarta-sans font-medium text-xs text-custom-dropdown-text capitalize placeholder:text-custom-dropdown-text gap-2 border-none
      "
      >
        <SelectValue placeholder="Monthly" />
      </SelectTrigger>
      <SelectContent className="bg-custom-dropdown-bg border-none">
        {metricsDate.map((metric) => (
          <SelectItem
            value={metric}
            key={metric}
            className="capitalize font-plus-jakarta-sans font-medium text-xs text-custom-dropdown-text"
          >
            {metric}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default MetricsDropdown;
