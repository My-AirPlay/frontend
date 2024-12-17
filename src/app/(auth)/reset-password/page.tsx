import React from "react";
// import ThemeHeader from "../_components/theme-header/theme-header";
import AuthWrapper from "../_components/auth-wrapper";
import Link from "next/link";
import { urls } from "@/lib/constants";
import AuthActions from "../_components/auth-actions/auth-actions";
import PasswordInput from "../_components/password-input/password-input";
const ResetPasswordPage = () => {
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
        title="Reset your password"
        description="Enter your new password carefully. The password must be 8 characters
          long"
      >
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
