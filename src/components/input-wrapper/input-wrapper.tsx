import React, { ComponentProps, ReactNode } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
interface InputWrapperProps extends ComponentProps<"input"> {
  leftEl?: ReactNode;
  rightEl?: ReactNode;
  styles?: ComponentProps<"input">["className"];
  error?: string;
  touched?: boolean;
}
const InputWrapper = ({
  leftEl,
  rightEl,
  className,
  styles,
  error,

  ...props
}: InputWrapperProps) => {
  return (
    <div>
      <div
        className={cn(
          "focus-within:border-black  bg-custom-input_dark rounded-2xl px-6 py-4 flex",
          styles
        )}
        tabIndex={0}
      >
        {leftEl}
        <Input
          className={cn(
            "border-none font-plus-jakarta-sans font-normal text-base text-white placeholder:text-custom-footer_border flex-1 focus-within:outline-none md:text-xl focus-visible:ring-0",
            className
          )}
          {...props}
        />
        {rightEl}
      </div>
      {error && (
        <span className="text-red-600 font-normal text-base">{error}</span>
      )}
    </div>
  );
};

export default InputWrapper;
