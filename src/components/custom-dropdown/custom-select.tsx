import React, { Fragment } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
interface CustomSelectProps {
  options: {
    label: string;
    value: string;
  }[];
  placeholder: string;
  onChange?: (val: string) => void;
  error?: string;
  defaultValue?: string;
}
const CustomSelect = ({
  options,
  placeholder,
  onChange = () => {},
  error,
  defaultValue = "",
}: CustomSelectProps) => {
  return (
    <Fragment>
      <Select onValueChange={onChange}>
        <SelectTrigger
          className="w-full rounded-[16px] h-[64px] bg-[#383838] flex justify-between items-center font-plus-jakarta-sans font-normal text-base text-[#A6A6A6] border-none"
          type="button"
        >
          <SelectValue defaultValue={defaultValue} placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-[#383838] border-none">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.value}
            </SelectItem>
          ))}
          <SelectItem className="bg-[#383838]" value="band">
            Band
          </SelectItem>
        </SelectContent>
      </Select>
      {error && (
        <span className="text-red-600 font-normal text-base block mt-2">
          {error}
        </span>
      )}
    </Fragment>
  );
};

export default CustomSelect;
