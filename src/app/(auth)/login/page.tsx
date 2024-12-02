import { Metadata } from "next";
import React from "react";
import AuthWrapper from "../_components/auth-wrapper";
import InputWrapper from "@/components/input-wrapper/input-wrapper";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import facebook from "@/app/assets/facebook.svg";
import google from "@/app/assets/google.svg";
import github from "@/app/assets/github.svg";
import Image from "next/image";
import AuthFormWrapper from "../_components/auth-form-wrapper";
export const metadata: Metadata = {
  title: "Login",
};
const faqTexts = ["Terms & Conditions", "Support", "Customer Care"];
const RoleLogin = () => {
  return (
    <AuthFormWrapper
      pageTitle="Welcome Back .!"
      pageDescription="Like you never left"
      formDescription="Glad you’re back.!"
      formTitle="Login"
      faqIntro="Don’t have an account ? "
      faqLink="/register"
      faqLinkText="Signup"
    >
      <form>
        <div className="flex flex-col gap-6 mb-1">
          <InputWrapper type="email" placeholder="Email address" />
          <InputWrapper type="password" placeholder="Password" />
        </div>
        <div className="flex gap-1 items-center mb-6">
          <input
            type="checkbox"
            name="rememebr"
            id="rememer"
            className="accent-custom-primary bg-transparent"
          />
          <label
            htmlFor="remember"
            className="font-noto-sans font-medium text-white text-base"
          >
            Remember me
          </label>
        </div>
        <Button variant={"authBtn"} className="mb-4">
          <span>LOGIN</span>

          <MoveRight size={"24px"} />
        </Button>
        <Link
          href={"/forgot"}
          className="text-white font-medium text-base text-center w-full block"
        >
          Forgot password ?
        </Link>
      </form>
    </AuthFormWrapper>
  );
};

export default RoleLogin;
