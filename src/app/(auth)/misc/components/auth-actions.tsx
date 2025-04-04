import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import google from "@/app/(auth)/misc/assets/google.svg";
interface AuthActionsProps {
  btnText: string;
  isDisabled?: boolean;
}
const AuthActions = ({ btnText, isDisabled }: AuthActionsProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
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
      </Button>
    </div>
  );
};

export default AuthActions;
