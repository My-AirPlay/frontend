import Image from "next/image";
import React from "react";
import loginImg from "../../_assets/login.png";
import { Metadata } from "next";
import AuthWrapper from "../../_components/auth-wrapper";
import SocialBtn from "../../_components/social-btn";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Artist Login",
};
const ArtistLoginPage = () => {
  return (
    <main className="min-h-svh grid grid-cols-2 relative">
      <AuthWrapper>
        <div className="flex-1 max-w-md mx-auto pt-12 flex flex-col items-center">
          <p className="text-custom-grey-46 text-center text-sm mb-6">
            Create an account or log in to book and manage your appointments.
          </p>
          <div className="w-full flex flex-col gap-3">
            <SocialBtn />
            <SocialBtn />
          </div>
          <div className="w-full my-8 grid-stack place-items-center">
            <div className="w-full h-px  bg-custom-grey-90"></div>
            <div className="bg-custom-darkBg text-custom-grey-75 font-normal text-sm px-2">
              OR
            </div>
          </div>
          <form className="w-full flex flex-col gap-6 mb-8">
            <input
              type="email"
              className="bg-white px-4 h-12 rounded-lg placeholder:text-custom-grey-75 font-normal text-sm text-custom-dark w-full"
              placeholder="Email address"
            />
            <button className="bg-custom-primary w-full rounded-lg text-white font-semibold text-base  h-12 px-4 flex items-center justify-center">
              Continue
            </button>
          </form>
          <p className="text-white flex flex-col font-semibold text-base items-center">
            Have an Admin account?
            <Link
              href={"#"}
              className="text-custom-primary  text-sm font-normal"
            >
              Sign in as an Admin
            </Link>
          </p>
        </div>
      </AuthWrapper>
      <section className="sticky top-0 right-0">
        <Image
          src={loginImg}
          alt=""
          className="h-svh object-cover object-center"
        />
      </section>
    </main>
  );
};

export default ArtistLoginPage;
