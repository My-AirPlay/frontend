import React, { ComponentProps, ReactNode } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
interface InputWrapperProps extends ComponentProps<"input"> {
  leftEl?: ReactNode;
  rightEl?: ReactNode;
}
const InputWrapper = ({
  leftEl,
  rightEl,
  className,
  ...props
}: InputWrapperProps) => {
  return (
    <div
      className="focus-within:border-black border border-white rounded-xl px-4 py-[14px]"
      tabIndex={0}
    >
      {leftEl}
      <Input
        className={cn(
          "border-none font-noto-sans font-normal text-xl text-white placeholder:text-white flex-1 focus-within:outline-none md:text-xl focus-visible:ring-0",
          className
        )}
        {...props}
      />
      {rightEl}
    </div>
  );
};

export default InputWrapper;
