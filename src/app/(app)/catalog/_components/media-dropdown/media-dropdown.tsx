import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react/dist/iconify.js";

import React from "react";
interface MediaDropdownProps {
  onView?: () => void;
  onDelete?: () => void;
}
const MediaDropdown = ({ onView, onDelete }: MediaDropdownProps) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="px-3 py-[14px]">
          <Icon
            icon="material-symbols:more-vert"
            width="24"
            height="24"
            color="white"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-black">
          <DropdownMenuItem
            onClick={onView}
            className="flex items-center gap-2 font-plus-jakarta-sans font-bold text-base text-white cursor-pointer bg-black hover:bg-black"
          >
            <Icon icon="mdi:eye" width="24" height="24" />
            <small>View</small>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={onDelete}
            className="flex items-center gap-2 font-plus-jakarta-sans font-bold text-base text-custom-error cursor-pointer bg-black hover:bg-black"
          >
            <Icon
              icon="mdi:delete"
              width="24"
              height="24"
              className="text-custom-error"
            />
            <small>Delete</small>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MediaDropdown;
