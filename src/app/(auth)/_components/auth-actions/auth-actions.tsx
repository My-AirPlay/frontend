import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import google from "@/app/(auth)/_assets/google.svg";
interface AuthActionsProps {
  btnText: string;
  isDisabled?: boolean;
}
const AuthActions = ({ btnText, isDisabled }: AuthActionsProps) => {
  return (
    <div className="flex gap-2">
      <Button
        className="bg-transparent w-full max-w-icon-btn size-14 rounded-[14px] flex items-center justify-center shadow-none border border-custom-icon-btn-border"
        type="button"
      >
        <Image src={google} alt="google" />
      </Button>
      <Button
        disabled={isDisabled}
        variant={"authBtn"}
        className="h-14 tracking-wider font-normal text-base"
        type="submit"
      >
        {btnText}
      </Button>
    </div>
  );
};

export default AuthActions;
