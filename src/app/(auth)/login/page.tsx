import { Metadata } from "next";
import React from "react";
import InputWrapper from "@/components/input-wrapper/input-wrapper";
import Link from "next/link";
import { urls } from "@/lib/constants";
import AuthWrapper from "../_components/auth-wrapper";
// import AuthHeader from "@/components/auth-header/auth-header";
import AuthActions from "../_components/auth-actions/auth-actions";
import PasswordInput from "../_components/password-input/password-input";
export const metadata: Metadata = {
  title: "Login",
};

const RoleLogin = () => {
  return (
    <>
      <AuthWrapper
        linkText={
          <p className="font-plus-jakarta-sans text-custom-registration_link text-lg font-normal">
            Not a member?{" "}
            <Link
              href={urls.register}
              className="font-bold text-custom-primary"
            >
              Sign up
            </Link>{" "}
            now
          </p>
        }
        title="Sign in"
        description={
          <span>
            To upload music and videos, you must accept our{" "}
            <span className="text-custom-primary">terms</span> and{" "}
            <span className="text-custom-primary">conditions</span>{" "}
            <span className="text-custom-registration_link">
              on the registration
            </span>{" "}
            website
          </span>
        }
      >
        <h1 className="font-black text-white text-center md:text-4xl text-2xl  mb-10"></h1>

        <form className="flex flex-col gap-5">
          <InputWrapper type="email" placeholder="Email" />
          <div>
            <PasswordInput placeholder="Password" />
            <Link
              href={urls.forgotPassword}
              className="text-custom-primary text-14 font-plus-jakarta-sans font-medium"
            >
              Forgot your password?
            </Link>
          </div>
          <AuthActions btnText="Sign In" />
        </form>
      </AuthWrapper>
    </>
  );
};

export default RoleLogin;
