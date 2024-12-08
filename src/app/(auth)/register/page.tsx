"use client";
import React, { useState } from "react";
import { urls } from "@/lib/constants";

import AuthWrapper from "../_components/auth-wrapper";
import { Check } from "lucide-react";
import InputWrapper from "@/components/input-wrapper/input-wrapper";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import google from "@/app/(auth)/_assets/google.svg";
import Link from "next/link";

const SingupPage = () => {
  const [checked, setChecked] = useState(false);
  return (
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

        <InputWrapper type="password" placeholder="Password" />
        <InputWrapper type="password" placeholder="Confirm Password" />

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
            Sign up
          </Button>
        </div>
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
  );
};

export default SingupPage;
