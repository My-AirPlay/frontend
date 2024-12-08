import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";
interface AuthLayoutProps {
  children: ReactNode;
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="bg-custom-background flex flex-col min-h-svh pt-11 gap-10">
      <div className="flex-1 flex-col flex">{children}</div>
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
    </div>
  );
};

export default AuthLayout;
