import React from "react";
import InputWrapper from "@/components/input-wrapper/input-wrapper";
import AuthWrapper from "../_components/auth-wrapper";
import Link from "next/link";
import { urls } from "@/lib/constants";
import AuthActions from "../_components/auth-actions/auth-actions";
const ForgotPasswordPage = () => {
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
        title="Forgot Password"
        description="Enter your email address below and we'll email you a link to
          reset your password."
      >
        <form className="flex flex-col gap-4">
          <InputWrapper placeholder="Email" />
          <AuthActions btnText="Confirm" />
        </form>
      </AuthWrapper>
    </>
  );
};

export default ForgotPasswordPage;
