"use client";

import { onboardingStages, onboardingStagesKey, OnboardingSteps, urls, userProfileStage } from "@/lib/constants";
import OnboardingBasciDetail from "./_components/basic-details/basic-details";
import OnboardingBankDetail from "./_components/bank-details/bank-details";
import OnboardingSocialMedia from "./_components/social-media-links/social-media-links";
import PreviewOnboarding from "./_components/preview-onboarding/preview-onboarding";
import React, { useState } from "react";
import CustomAppLayout from "@/components/app-layout/app-layout";
import { useArtisteContext } from "@/contexts/AuthContextArtist";
import { getArtistProfile } from "@/contexts/AuthContextArtist";
import { redirect } from "next/navigation";


const OnboardingClientPage = () => {

  const { artist } = useArtisteContext();
  React.useEffect(() => {
    const fetchUser = async () => {
      const user = await getArtistProfile();
      if (user && user.stage !== userProfileStage.onboarding) {
        redirect("/artiste/dashboard");
      }
    };
    fetchUser();
  }, []);


  const [currentStep, setCurrentStep] = useState(
    onboardingStages[artist?.stage || ""] || OnboardingSteps.BASIC_DETAIL
  );
  const screens = {
    [OnboardingSteps.BASIC_DETAIL]: (
      <OnboardingBasciDetail email={artist?.email || ""} setCurrentStep={setCurrentStep} />
    ),
    [OnboardingSteps.BANK]: (
      <OnboardingBankDetail setCurrentStep={setCurrentStep} email={artist?.email || ""} />
    ),
    [OnboardingSteps.SOCIAL_LINK]: (
      <OnboardingSocialMedia email={artist?.email || ""} setCurrentStep={setCurrentStep} />
    ),
    [OnboardingSteps.PREVIEW]: (
      <PreviewOnboarding setCurrentStep={setCurrentStep} />
    ),
  };

  if (!artist) {
    redirect(urls.login);
  }

  if (!onboardingStagesKey.includes(artist?.stage)) {
    redirect(urls.dashboard);
  }
  return <CustomAppLayout>{screens[currentStep]}</CustomAppLayout>;
};

export default OnboardingClientPage;
