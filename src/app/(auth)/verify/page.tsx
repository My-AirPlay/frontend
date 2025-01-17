import React from "react";
import AuthWrapper from "../_components/auth-wrapper";
import Link from "next/link";
import { urls } from "@/lib/constants";
// import AuthHeader from "@/components/auth-header/auth-header";

const VerifyPage = () => {
  return (
    <>
      <AuthWrapper
        title="Verify email"
        description="Your email has been verified Click to enter the site."
      >
        <Link
          href={urls.login}
          className="bg-custom-primary flex justify-center items-center h-16 rounded-full font-plus-jakarta-sans font-extrabold text-xl tracking-wider text-white"
        >
          Sign in
        </Link>
      </AuthWrapper>
    </>
  );
};

export default VerifyPage;
