import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface CustomCheckboxProps {
  isSelected: boolean;
  onSelect: () => void;
  isDisabled?: boolean;
}
const CustomCheckbox = ({
  isSelected,
  onSelect,
  isDisabled,
}: CustomCheckboxProps) => {
  const onClick = () => {
    if (!isDisabled) {
      onSelect();
    }
  };
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-5 h-5 border-2 rounded-[5px] border-white bg-custom-page-bg",
        isSelected && "border-custom-primary bg-custom-primary "
      )}
      disabled={isDisabled}
    >
      {isSelected && (
        <Icon
          icon="material-symbols:check-rounded"
          width="12"
          height="12"
          color="white"
        />
      )}
    </button>
  );
};

export default CustomCheckbox;
