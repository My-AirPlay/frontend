"use client";
import React, { useState } from "react";
import { urls } from "@/lib/constants";

import AuthWrapper from "../_components/auth-wrapper";
import { Check } from "lucide-react";
import InputWrapper from "@/components/input-wrapper/input-wrapper";
import Link from "next/link";
import AuthHeader from "@/components/auth-header/auth-header";
import AuthActions from "../_components/auth-actions/auth-actions";
import PasswordInput from "../_components/password-input/password-input";

const SingupPage = () => {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <div className="container mx-auto mb-10 ">
        <AuthHeader />
      </div>
      <AuthWrapper
        linkText={
          <p className="font-plus-jakarta-sans text-custom-registration_link text-lg font-normal">
            Already a member?{" "}
            <Link href={urls.login} className="font-bold text-custom-primary">
              Sign In
            </Link>{" "}
          </p>
        }
      >
        <h1 className="font-black text-white text-center text-4xl mb-10">
          Sign up
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

          <PasswordInput placeholder="Password" />
          <PasswordInput placeholder="Confirm Password" />

          <AuthActions btnText="Sign up" />
          <div className="flex items-center gap-1">
            <button
              onClick={() => setChecked((prev) => !prev)}
              type="button"
              className="h-5 text-white rounded-sm w-5 bg-custom-check-box flex justify-center items-center"
            >
              {checked && <Check />}
            </button>
            <small className="font-plus-jakarta-sans text-custom-registration_link text-lg font-normal">
              I read and accepted the{" "}
              <span className="text-custom-primary">terms</span> and{" "}
              <span className="text-custom-primary">conditions</span>
            </small>
          </div>
        </form>
      </AuthWrapper>
    </>
  );
};

export default SingupPage;
