import { uploadTypes } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
type MusicTypeCardProps = (typeof uploadTypes)[0] & {
  onClick: () => void;
  isSelected: boolean;
};
const MusicTypeCard = ({
  img,
  title,
  isSelected,
  onClick,
}: MusicTypeCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "border-[#7B7B7B] border flex md:flex-col p-4 rounded-xl items-center gap-2",
        isSelected && "border-custom-primary"
      )}
    >
      <figure>
        <Image src={img} alt={title} className="md:max-w-none max-w-10" />
      </figure>
      <p className="font-plus-jakarta-sans font-semibold md:text-28 text-base text-white">
        {title}
      </p>
    </button>
  );
};

export default MusicTypeCard;
