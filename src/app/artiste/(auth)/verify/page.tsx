"use client";
import React, { useState } from "react";
import AuthWrapper from "../misc/components/auth-wrapper";
import useUserVerifcationStore from "@/stores/verification/user-verification.store";
import OTPInput from "@/components/ui/input-otp-group-of-five";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { verifyUser } from "@/app/artiste/(auth)/misc/api/mutations/auth.mutations";
import { toast } from "sonner";
import { useRouter } from "nextjs-toploader/app";
import { urls } from "@/lib/constants";
import { SmallSpinner } from "@/components/icons";

// import AuthHeader from "@/components/auth-header/auth-header";

const VerifyPage = () => {
  const { email } = useUserVerifcationStore.getState();
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const { mutateAsync, status, isPending } = useMutation({
    mutationFn: verifyUser,
    onSuccess({ error }) {
      if (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        toast.error((error.response as any)?.data.message as string);

        return;
      }
      toast.success("Your account has been verified.");

      router.replace(urls.login);
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
          size={"lg"}
          disabled={otp.length !== 5 || status === "pending"}
          onClick={sendVerification}
          className="bg-custom-primary h-12 w-full mx-auto mt-10 rounded-full font-plus-jakarta-sans font-extrabold text-base tracking-wider text-white"
        >
          Verify
          {isPending && <SmallSpinner className="ml-2" />}
        </Button>
      </AuthWrapper>
    </>
  );
};

export default VerifyPage;
