import React from "react";
import AuthWrapper from "../_components/auth-wrapper";
import Link from "next/link";
import { urls } from "@/lib/constants";
import AuthHeader from "@/components/auth-header/auth-header";

const VerifyPage = () => {
  return (
    <>
      <div className="container mx-auto mb-10 ">
        <AuthHeader />
      </div>
      <AuthWrapper>
        <h1 className="font-black text-white text-center text-4xl mb-10">
          Verify email
        </h1>
        <p className="font-plus-jakarta-sans font-medium text-xl mb-10 max-w-[542px] mx-auto text-center text-custom-footer_border ">
          Your email has been verified Click to enter the site.
        </p>
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
