import React from "react";
import InputWrapper from "@/components/input-wrapper/input-wrapper";
import AuthWrapper from "../_components/auth-wrapper";
import ThemeHeader from "../_components/theme-header/theme-header";
import Link from "next/link";
import { urls } from "@/lib/constants";
import AuthActions from "../_components/auth-actions/auth-actions";
const ForgotPasswordPage = () => {
  return (
    <>
      <ThemeHeader />
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
      >
        <h1 className="text-center text-white font-roboto font-black text-4xl mb-10">
          Forgot Password
        </h1>
        <p className="text-custom-footer_border mb-10 font-plus-jakarta-sans font-medium text-xl">
          Enter your email address below and we&apos;ll email you a link to
          reset your password.
        </p>
        <form className="flex flex-col gap-4">
          <InputWrapper placeholder="Email" />
          <AuthActions btnText="Confirm" />
        </form>
      </AuthWrapper>
    </>
  );
};

export default ForgotPasswordPage;
