import React from "react";
import AuthFormWrapper from "../_components/auth-form-wrapper";
import InputWrapper from "@/components/input-wrapper/input-wrapper";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

const ForgotPasswordPage = () => {
  return (
    <AuthFormWrapper
      pageTitle="No Worries.!!"
      pageDescription="Take me back.!"
      formTitle="Forgot Password ?"
      formDescription="Please enter you’re email"
      showOAuth={false}
      faqIntro="Don’t have an account ? "
    >
      <form className="flex flex-col gap-4">
        <InputWrapper placeholder="example@mail.com" />
        <Button variant={"authBtn"}>
          RESET PASSWORD <MoveRight size={"24px"} />
        </Button>
      </form>
    </AuthFormWrapper>
  );
};

export default ForgotPasswordPage;
