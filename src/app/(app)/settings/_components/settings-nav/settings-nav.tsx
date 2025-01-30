"use client";
import { settingsLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SettingsNav = () => {
  const pathname = usePathname();
  return (
    <nav className="mb-12 hidden md:block">
      <ul className="w-full max-w-[825px] flex justify-between items-center py-8">
        {settingsLinks.map((link) => (
          <li key={link.title}>
            <Link
              href={link.route}
              className={cn(
                "font-plus-jakarta-sans font-medium text-base text-custom-registration_link",
                pathname === link.route || pathname === link.subRoute
                  ? "text-custom-primary"
                  : ""
              )}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SettingsNav;
