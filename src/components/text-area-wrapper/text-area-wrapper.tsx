import React, { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";
interface TextareaWrapperProps extends ComponentProps<"textarea"> {
  leftEl?: ReactNode;
  rightEl?: ReactNode;
  styles?: ComponentProps<"input">["className"];
  error?: string;
}
const TextareaWrapper = ({
  leftEl,
  rightEl,
  className,
  styles,
  error,
  ...props
}: TextareaWrapperProps) => {
  return (
    <div>
      <div
        className={cn(
          "focus-within:border-black  bg-custom-input_dark rounded-2xl px-6 py-4 flex  md:min-h-[155px] min-h-[142px]",
          styles
        )}
        tabIndex={0}
      >
        {leftEl}
        <textarea
          className={cn(
            "border-nonefont-plus-jakarta-sans font-normal bg-transparent text-base text-white placeholder:text-custom-footer_border flex-1 focus-within:outline-none md:text-xl focus-visible:ring-0",
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

export default TextareaWrapper;
