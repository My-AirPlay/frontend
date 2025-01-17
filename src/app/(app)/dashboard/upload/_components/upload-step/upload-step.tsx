import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
interface UploadStepProp {
  text: string;
  isCurrent: boolean;
  isDone: boolean;
  title: string;
  showRightBorder?: boolean;
}
const UploadStep = ({
  isCurrent,
  isDone,
  text,
  title,
  showRightBorder = true,
}: UploadStepProp) => {
  return (
    <li className="flex flex-col gap-3">
      <div className="flex items-center">
        <div
          className={cn(
            "border-t-2 border-t-custom-step-line border-dashed flex-1",
            isDone && "border-t-custom-primary"
          )}
        />
        <div
          className={cn(
            "w-10 h-10 rounded-full border-4 hover:bg-custom-step-inactive border-white bg-custom-step-inactive grid place-items-center",
            (isCurrent || isDone) &&
              " border-custom-primary hover:bg-white bg-white"
          )}
        >
          {!isDone && !isCurrent && (
            <span className="text-custom-step-text font-plus-jakarta-sans text-sm font-bold ">
              {text}
            </span>
          )}
          {isDone && !isCurrent && (
            <Icon
              icon="gg:check-o"
              width="24"
              height="24"
              className="text-custom-primary"
            />
          )}
        </div>
        {showRightBorder && (
          <div
            className={cn(
              "border-t-2 border-t-custom-step-line border-dashed flex-1",
              isDone && "border-t-custom-primary"
            )}
          />
        )}
      </div>
      <p
        className={cn(
          "text-center font-plus-jakarta-sans text-custom-step-text  font-medium text-sm",
          (isCurrent || isDone) && "text-custom-primary"
        )}
      >
        {title}
      </p>
    </li>
  );
};

export default UploadStep;
