"use client";

import { onboardingStages, OnboardingSteps } from "@/lib/constants";
import OnboardingBasciDetail from "./_components/basic-details/basic-details";
import OnboardingBankDetail from "./_components/bank-details/bank-details";
import OnboardingSocialMedia from "./_components/social-media-links/social-media-links";
import PreviewOnboarding from "./_components/preview-onboarding/preview-onboarding";
import { useState } from "react";
import CustomAppLayout from "@/components/app-layout/app-layout";
const OnboardingClientPage = ({
  email,
  stage,
}: {
  email: string;
  stage: string;
}) => {
  const [currentStep, setCurrentStep] = useState(
    onboardingStages[stage] || OnboardingSteps.BASIC_DETAIL
  );
  const screens = {
    [OnboardingSteps.BASIC_DETAIL]: (
      <OnboardingBasciDetail email={email} setCurrentStep={setCurrentStep} />
    ),
    [OnboardingSteps.BANK]: (
      <OnboardingBankDetail setCurrentStep={setCurrentStep} email={email} />
    ),
    [OnboardingSteps.SOCIAL_LINK]: (
      <OnboardingSocialMedia email={email} setCurrentStep={setCurrentStep} />
    ),
    [OnboardingSteps.PREVIEW]: (
      <PreviewOnboarding setCurrentStep={setCurrentStep} />
    ),
  };
  return <CustomAppLayout>{screens[currentStep]}</CustomAppLayout>;
};

export default OnboardingClientPage;
