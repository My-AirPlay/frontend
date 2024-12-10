"use client";
import React, { useMemo } from "react";
import logo from "@/app/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { urls } from "@/lib/constants";
import {
  Compass,
  Folder,
  HandHeart,
  LayoutDashboard,
  LogOut,
  Mail,
  Settings,
  SquareUser,
} from "lucide-react";
import { NavLinks } from "./sidebar.interface";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
const Sidebar = () => {
  const pathname = usePathname();
  const navLinks = useMemo<NavLinks[]>(
    () => [
      {
        icon: <LayoutDashboard />,
        title: "Dashboard",
        route: urls.dashboard,
      },
      {
        icon: <Mail />,
        title: "Messages",
      },
      {
        icon: <Compass />,
        title: "Platforms",
      },
      {
        icon: <Folder />,
        title: "Files",
      },
      {
        icon: <HandHeart />,
        title: "Favourites",
      },
      {
        icon: <SquareUser />,
        title: "Management",
      },
      {
        icon: <Settings />,
        title: "Settings",
      },
    ],
    []
  );
  return (
    <aside className="border border-custom-sidebar-stroke max-h-svh sticky left-0 top-0 bottom-0 min-w-sidebar rounded-r-3xl px-3 py-4 bg-custom-sidebar flex flex-col justify-between gap-10 overflow-auto">
      <div>
        <Link className="w-fit block mb-10 mx-auto" href={urls.dashboard}>
          <Image src={logo} alt="airplay" />
        </Link>
        <nav>
          <ul className="flex flex-col gap-11">
            {navLinks.map((navLink) => (
              <li key={navLink.title}>
                <Link className="flex" href={navLink.route || "#"}>
                  <div
                    className={cn(
                      "w-[6px] h-6 bg-transparent rounded-full ",
                      pathname.includes(
                        navLink.route || navLink.title.toLowerCase()
                      ) && "bg-white sidebar-active-shadow"
                    )}
                  />
                  <div
                    className={cn(
                      "flex-1 flex justify-center text-white/30",
                      pathname.includes(
                        navLink.route || navLink.title.toLowerCase()
                      ) && "text-white"
                    )}
                  >
                    {navLink.icon}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <Button
        className="bg-custom-primary w-full max-w-14 rounded-lg text-white h-14 aspect-square px-2 mx-auto flex"
        style={{
          height: 68,
        }}
      >
        <LogOut />
      </Button>
    </aside>
  );
};

export default Sidebar;
