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
export const metadata: Metadata = {
  title: "Login",
};
const faqTexts = ["Terms & Conditions", "Support", "Customer Care"];
const RoleLogin = () => {
  return (
    <AuthWrapper title="Welcome Back .!" subTitle="Like you never left">
      <div className="flex-1">
        <h1 className="font-noto-sans text-white font-semibold text-4xl">
          Login
        </h1>
        <p className="font-noto-sans text-base font-medium text-white mb-4">
          Glad you’re back.!
        </p>
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

        <div className="mt-[47px]">
          <div className="flex items-center gap-2 mb-3 ">
            <div className="border-t-2 border-t-custom-auth_stroke w-full flex-1" />
            <div className="w-6 h-5  text-custom-auth_stroke font-noto-sans font-medium text-base">
              Or
            </div>
            <div className="border-t-2 border-t-custom-auth_stroke w-full flex-1" />
          </div>
          <div className="flex justify-center items-center gap-5">
            <figure>
              <Image src={google} alt="google" />
            </figure>
            <figure>
              <Image src={facebook} alt="facebook" />
            </figure>
            <figure>
              <Image src={github} alt="github" />
            </figure>
          </div>
        </div>
      </div>
      <div className="flex-col gap-2 flex">
        <p className="text-base w-full text-center font-medium text-white">
          Don’t have an account ?{" "}
          <Link className="font-bold" href={"/register"}>
            Signup
          </Link>
        </p>
        <nav>
          <ul className="flex items-center justify-between">
            {faqTexts.map((faqText) => (
              <li
                className="font-noto-sans font-normal text-base text-white"
                key={faqText}
              >
                {faqText}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </AuthWrapper>
  );
};

export default RoleLogin;
