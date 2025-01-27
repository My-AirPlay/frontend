import Link from "next/link";
import React from "react";
import { Icon } from "@iconify/react";
import { SidebarItemProps } from "./sidebar-item.interface";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
const SidebarItem = ({ icon, title, route }: SidebarItemProps) => {
  const pathname = usePathname();
  const isSelected = route && pathname.startsWith(route);
  return (
    <li className="relative">
      {isSelected && (
        <div className="bg-custom-sidebar h-10 rounded-br-[30px] relative z-50" />
      )}
      <Link href={route || "#"} className="">
        <div
          className={cn(
            "flex flex-col gap-1 items-center text-xs w-full   p-2 justify-center h-20 rounded-tl-3xl rounded-bl-3xl text-custom-sidebar-inactive after:absolute after:top-0 ",
            isSelected &&
              "after:left-0 after:right-0 after:h-10 before:absolute before:bottom-0 before:left-0 before:right-0 before:bg-custom-page-bg after:bg-custom-page-bg before:h-10 text-white bg-custom-page-bg"
          )}
        >
          <Icon icon={icon} width={28} />
          <span className="whitespace-nowrap">{title}</span>
        </div>
      </Link>
      {isSelected && (
        <div className="bg-custom-sidebar h-10 rounded-tr-[30px] relative z-50" />
      )}
    </li>
  );
};

export default SidebarItem;
