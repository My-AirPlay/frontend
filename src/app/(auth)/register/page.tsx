"use client";
import React, { useState } from "react";
import AuthFormWrapper from "../_components/auth-form-wrapper";
import GeneralDetailForm from "./_components/general-detail/general-detail";
import { SingupStep } from "@/lib/constants";
import BankDetailForm from "./_components/bank-detail/bank-detail";

const SingupPage = () => {
  const [currentStep, setCurrentStep] = useState(SingupStep.BANK);
  return (
    <AuthFormWrapper
      pageTitle={
        currentStep === SingupStep.GENERAL
          ? "Let’s get Started.!"
          : "Almost There.!"
      }
      pageDescription="Quick & Easy"
      formTitle="Signup"
      formDescription="Just some details to get you in.!"
      faqIntro="Already Registered? "
      faqLinkText="Login"
      faqLink="/login"
      showFaqs={currentStep !== SingupStep.BANK}
      showOAuth={currentStep !== SingupStep.BANK}
    >
      {currentStep === SingupStep.GENERAL ? (
        <GeneralDetailForm onNext={() => setCurrentStep(SingupStep.BANK)} />
      ) : (
        <BankDetailForm />
      )}
    </AuthFormWrapper>
  );
};

export default SingupPage;
