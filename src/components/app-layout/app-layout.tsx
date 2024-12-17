import React, { ReactNode } from "react";
import AuthHeader from "../auth-header/auth-header";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
interface AppLayoutProps {
  children: ReactNode;
  showIcons?: boolean;
}
const CustomAppLayout = ({ children, showIcons }: AppLayoutProps) => {
  const year = new Date().getFullYear();
  return (
    <div className="flex flex-col  min-h-svh pb-[19px] bg-custom-page-bg overflow-hidden font-poppins ">
      <div className="max-w-page gap-10 mb-7 mx-auto w-full px-3 flex-1 flex flex-col">
        <AuthHeader />
        <main className="flex-1">{children}</main>

        {!showIcons && (
          <footer className="max-w-page mx-auto flex justify-between items-center w-full">
            <nav>
              <ul className="flex items-center gap-4">
                <li className="text-white font-medium text-xs">
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
            <small className="text-white font-medium text-xs">
              Supported by AirPlay
            </small>
          </footer>
        )}
      </div>
      {showIcons && (
        <footer className="pb-5 pt-8 border-t border-t-custom-footer_border">
          <ul className="flex justify-center items-center text-white/30  gap-10">
            <li>
              <Link href={"#"}>
                <Twitter />
              </Link>
            </li>
            <li>
              <Link href={"#"}>
                <Linkedin />
              </Link>
            </li>
            <li>
              <Link href={"#"}>
                <Instagram />
              </Link>
            </li>
            <li>
              <Link href={"#"}>
                <Facebook />
              </Link>
            </li>
          </ul>
        </footer>
      )}
    </div>
  );
};

export default CustomAppLayout;
