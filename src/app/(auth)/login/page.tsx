import { Metadata } from "next";
import React from "react";
import InputWrapper from "@/components/input-wrapper/input-wrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import google from "@/app/(auth)/_assets/google.svg";
import { urls } from "@/lib/constants";
import Image from "next/image";
import AuthWrapper from "../_components/auth-wrapper";
export const metadata: Metadata = {
  title: "Login",
};

const RoleLogin = () => {
  return (
    <AuthWrapper
      linkText={
        <p className="font-plus-jakarta-sans text-custom-registration_link text-lg font-normal">
          Not a member?{" "}
          <Link href={urls.register} className="font-bold text-custom-primary">
            Sign up
          </Link>{" "}
          now
        </p>
      }
    >
      <h1 className="font-black text-white text-center text-4xl mb-10">
        Sign in
      </h1>
      <p className="font-plus-jakarta-sans font-medium text-xl mb-10 max-w-[542px] text-custom-footer_border ">
        To upload music and videos, you must accept our{" "}
        <span className="text-custom-primary">terms</span> and{" "}
        <span className="text-custom-primary">conditions</span>{" "}
        <span className="text-custom-registration_link">
          on the registration
        </span>{" "}
        website
      </p>
      <form className="flex flex-col gap-5">
        <InputWrapper type="email" placeholder="Email" />
        <div>
          <InputWrapper
            type="password"
            placeholder="Password"
            styles="bg-custom-input_light mb-3"
          />
          <Link
            href={urls.forgotPassword}
            className="text-custom-primary text-14 font-plus-jakarta-sans font-medium"
          >
            Forgot your password?
          </Link>
        </div>
        <div className="flex gap-2">
          <Button
            className="bg-transparent w-full max-w-icon-btn h-16 rounded-[14px] flex items-center justify-center shadow-none border border-custom-icon-btn-border"
            type="button"
          >
            <Image src={google} alt="google" />
          </Button>
          <Button
            variant={"authBtn"}
            className="h-16 tracking-wider"
            type="submit"
          >
            Sign In
          </Button>
        </div>
      </form>
    </AuthWrapper>
  );
};

export default RoleLogin;
