import React, { Fragment, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
interface DateFieldProps {
  error?: string;
  onDateChange: (date: Date) => void;
  defaultDate?: Date | null;
}
const DateField = ({
  onDateChange,
  error,
  defaultDate = null,
}: DateFieldProps) => {
  const [date, setDate] = useState<Date | null>(defaultDate);
  return (
    <Fragment>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            className="focus-within:border-black  bg-custom-input_dark rounded-2xl px-6 py-4 flex h-[64px] border-none font-plus-jakarta-sans font-normal text-base text-white placeholder:text-custom-footer_border flex-1 focus-within:outline-none md:text-xl focus-visible:ring-0 justify-between hover:bg-custom-input"
          >
            <span>{date ? format(date, "PPP") : "Input Date"}</span>
            <Icon icon={"solar:calendar-line-duotone"} width={24} height={24} />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="bg-custom-input_dark text-white font-plus-jakarta-sans border-none"
        >
          <Calendar
            mode="single"
            selected={date!}
            onSelect={(date) => {
              if (!date) return;
              setDate(date);
              onDateChange(date);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {error && (
        <span className="text-red-600 font-normal text-base">{error}</span>
      )}
    </Fragment>
  );
};

export default DateField;
