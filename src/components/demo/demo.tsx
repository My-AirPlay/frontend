import { urls } from "@/lib/constants";
import Link from "next/link";
import React from "react";

const DemoLinks = () => {
  const links = [
    {
      title: " Landing Page",
      route: "/",
    },
    {
      title: "Login",
      route: urls.login,
    },
    {
      title: "Sign up",
      route: urls.register,
    },
    {
      title: "Forgot Password",
      route: urls.forgotPassword,
    },
    {
      title: "Verify",
      route: "/verify",
    },
    {
      title: "Reset Password",
      route: "/reset-password",
    },
    {
      title: "Onboarding",
      route: "/onboarding",
    },
    {
      title: "Onboarding Status",
      route: "/onboarding/status",
    },
    {
      title: "Dashboard",
      route: urls.dashboard,
    },
    {
      title: "Upload Music",
      route: urls.uploadMusic,
    },
  ];
  return (
    <div className="fixed left-0 top-0 bottom-0  flex items-cente z-[9999]">
      <div className="bg-black p-4 max-h-60 overflow-y-auto  flex flex-col gap-4">
        {links.map((link) => (
          <Link
            key={link.title}
            href={link.route}
            className="text-white font-plus-jakarta-sans font-semibold"
          >
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DemoLinks;
