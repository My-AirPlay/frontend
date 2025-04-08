import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import google from "@/app/artiste/(auth)/misc/assets/google.svg";
import { SmallSpinner } from "@/components/icons";
interface AuthActionsProps {
  btnText: string;
  isDisabled?: boolean;
  isBusy?: boolean
}
const AuthActions = ({ btnText, isDisabled, isBusy }: AuthActionsProps) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        className="bg-transparent w-full max-w-icon-btn size-12 rounded-full flex items-center justify-center shadow-none border border-custom-icon-btn-border p-2"
        size="lg"
        type="button"
        disabled
      >
        <Image src={google} alt="google" />
      </Button>
      <Button
        disabled={isDisabled}
        size="lg"
        className="h-12 tracking-wider font-normal text-base rounded-full w-full max-w-[275px]"
        type="submit"
      >
        {btnText}
        {
          isBusy && <SmallSpinner className="ml-2"/>
        }
      </Button>
    </div>
  );
};

export default AuthActions;
