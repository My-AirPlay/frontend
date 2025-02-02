"use client";
import React, { useState } from "react";
import AuthWrapper from "../_components/auth-wrapper";
import useUserVerifcationStore from "@/stores/verification/user-verification.store";
import OTPInput from "@/components/otp-input/otp-input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { verifyUser } from "@/lib/api/mutations";
import { toast } from "sonner";

// import AuthHeader from "@/components/auth-header/auth-header";

const VerifyPage = () => {
  const { email } = useUserVerifcationStore.getState();
  const [otp, setOtp] = useState("");

  const { mutateAsync, status } = useMutation({
    mutationFn: verifyUser,
    onSuccess({ error, data }) {
      if (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        toast.error((error.response as any)?.data.message as string);

        return;
      }
      toast.success("Your account has been verified.");

      console.log(data);
    },
  });
  const sendVerification = () => {
    mutateAsync({
      email,
      verificationCode: otp,
    });
  };
  return (
    <>
      <AuthWrapper
        title="Verify email"
        description="Enter the otp sent to your email"
      >
        <OTPInput value={otp} onChange={(val) => setOtp(val)} />
        <Button
          variant={"authBtn"}
          disabled={otp.length !== 5 || status === "pending"}
          onClick={sendVerification}
          className="bg-custom-primary w-full mx-auto flex justify-center items-center h-16 rounded-full font-plus-jakarta-sans font-extrabold text-xl tracking-wider text-white"
        >
          Verify
        </Button>
      </AuthWrapper>
    </>
  );
};

export default VerifyPage;
