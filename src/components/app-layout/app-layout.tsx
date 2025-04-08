import React, { ReactNode } from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import AuthHeader from "@/app/artiste/(auth)/misc/components/auth-header";
interface AppLayoutProps {
  children: ReactNode;
  showIcons?: boolean;
}
const CustomAppLayout = ({ children, showIcons }: AppLayoutProps) => {
  const year = new Date().getFullYear();
  return (
    <div className="flex flex-col min-h-svh bg-custom-page-bg overflow-hidden font-poppins ">
      <div className="max-w-page gap-10 mb-7 mx-auto w-full px-3 flex-1 flex flex-col">
        <AuthHeader />

        <main className="flex-1">{children}</main>

        {!showIcons && (
          <footer className="max-w-page mx-auto flex md:justify-between justify-center items-center w-full">
            <nav>
              <ul className="md:flex grid grid-cols-[repeat(2,auto)] items-center gap-4 justify-center place-content-center">
                <li className="text-white font-medium text-xs col-span-2 text-center">
                  Copyright &copy; {year} Airplay
                </li>
                <li className="text-white font-medium text-xs">
                  <Link href={"#"}>Privacy Policy </Link>
                </li>
                <li className="text-white font-medium text-xs">
                  <Link href={"#"}>Terms of Services </Link>
                </li>
              </ul>
            </nav>
            <small className="text-white md:block hidden font-medium text-xs">
              Supported by AirPlay
            </small>
          </footer>
        )}
      </div>
      {showIcons && (
        <footer className="pb-3 pt-4 border-t border-t-custom-footer_border/50">
          <ul className="flex justify-center items-center text-white/30  gap-10">
            <li>
              <Link href={"#"}>
                <Twitter size={18} />
              </Link>
            </li>
            <li>
              <Link href={"#"}>
                <Linkedin size={18} />
              </Link>
            </li>
            <li>
              <Link href={"#"}>
                <Instagram size={18} />
              </Link>
            </li>
            <li>
              <Link href={"#"}>
                <Facebook size={18} />
              </Link>
            </li>
          </ul>
        </footer>
      )}
    </div>
  );
};

export default CustomAppLayout;
