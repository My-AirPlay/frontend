"use client";
import InputWrapper from "@/components/input-wrapper/input-wrapper";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { ComponentProps, useState } from "react";
import eyeClose from "@/app/(auth)/_assets/eye-close.svg";
import eyeOpen from "@/app/(auth)/_assets/eye-open.svg";
interface PasswordInputProps extends ComponentProps<"input"> {
  styles?: string;
}
const PasswordInput = (props: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputWrapper
      {...props}
      styles={showPassword ? "bg-custom-input_light" : ""}
      type={showPassword ? "text" : "password"}
      rightEl={
        <Button
          type="button"
          className="bg-transparent w-fit hover:bg-transparent"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          <Image src={showPassword ? eyeOpen : eyeClose} alt="" />
        </Button>
      }
    />
  );
};

export default PasswordInput;
