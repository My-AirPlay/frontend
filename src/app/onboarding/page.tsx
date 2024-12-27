"use client";

import { OnboardingSteps } from "@/lib/constants";
import OnboardingBasciDetail from "./_components/basic-details/basic-details";
import OnboardingBankDetail from "./_components/bank-details/bank-details";
import OnboardingSocialMedia from "./_components/social-media-links/social-media-links";
import PreviewOnboarding from "./_components/preview-onboarding/preview-onboarding";
import { useState } from "react";
import CustomAppLayout from "@/components/app-layout/app-layout";
const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(OnboardingSteps.BASIC_DETAIL);
  const screens = {
    [OnboardingSteps.BASIC_DETAIL]: (
      <OnboardingBasciDetail setCurrentStep={setCurrentStep} />
    ),
    [OnboardingSteps.BANK]: (
      <OnboardingBankDetail setCurrentStep={setCurrentStep} />
    ),
    [OnboardingSteps.SOCIAL_LINK]: (
      <OnboardingSocialMedia setCurrentStep={setCurrentStep} />
    ),
    [OnboardingSteps.PREVIEW]: (
      <PreviewOnboarding setCurrentStep={setCurrentStep} />
    ),
  };
  return <CustomAppLayout>{screens[currentStep]}</CustomAppLayout>;
};

export default OnboardingPage;
