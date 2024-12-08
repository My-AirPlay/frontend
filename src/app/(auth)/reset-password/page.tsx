import React from "react";
import ThemeHeader from "../_components/theme-header/theme-header";
import AuthWrapper from "../_components/auth-wrapper";
import Link from "next/link";
import { urls } from "@/lib/constants";
import AuthActions from "../_components/auth-actions/auth-actions";
import PasswordInput from "../_components/password-input/password-input";
const ResetPasswordPage = () => {
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
          Reset your password
        </h1>
        <p className="text-custom-footer_border mb-10 font-plus-jakarta-sans font-medium text-xl">
          Enter your new password carefully. The password must be 8 characters
          long
        </p>
        <form className="flex flex-col gap-4">
          <PasswordInput placeholder="New password" />
          <PasswordInput placeholder="Repeat the password" />
          <AuthActions btnText="Confirm" />
        </form>
      </AuthWrapper>
    </>
  );
};

export default ResetPasswordPage;
