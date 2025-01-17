import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  //   DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import artistPlaceholder from "@/app/assets/artist-placeholder.png";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
const ProfileDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-custom-profile-btn border border-custom-sidebar-stroke rounded-full h-[53px] p-1 flex items-center gap-5 text-white min-w-[101px]">
        <Image src={artistPlaceholder} alt="" />
        <Icon
          className="text-custom-profile-icon"
          icon="icon-park-solid:down-one"
          width="20"
          height="20"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-blue-500"
        style={{
          backgroundColor: "black",
        }}
      >
        <DropdownMenuItem className="bg-black shadow-md text-white">
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-black shadow-md text-white" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
