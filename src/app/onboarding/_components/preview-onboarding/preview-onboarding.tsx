"use client";
import PreviewTable from "@/components/preview-table/preview-table";
import { Button } from "@/components/ui/button";
import { OnboardingSteps, urls } from "@/lib/constants";
import { useRouter } from "nextjs-toploader/app";
import React from "react";
interface PreviewOnboardingProps {
  setCurrentStep: (a: OnboardingSteps) => void;
}
const PreviewOnboarding = ({ setCurrentStep }: PreviewOnboardingProps) => {
  const { replace } = useRouter();
  const data = [
    [
      {
        title: "Account Type",
        value: "Artist",
      },
      {
        title: "First Name",
        value: "Ashley",
      },
      {
        title: "Last Name",
        value: "Ezechi",
      },
      {
        title: "Phone Number",
        value: "",
      },
      {
        title: "Country",
        value: "NG",
      },
      {
        title: "City",
        value: "LNG",
      },
      {
        title: "Artist Name",
        value: "The African",
      },
    ],
    [
      {
        title: "Bank Name",
        value: "Artist",
      },
      {
        title: "Ashley Eze",
        value: "Ashley",
      },
      {
        title: "Account Number",
        value: "0938483928",
      },
      {
        title: "Account Name",
        value: "First Bank",
      },
    ],
  ];
  return (
    <div className="fixed left-0 top-0 h-svh w-svw bg-custom-edit-modal z-50 py-14 px-5 overflow-y-auto">
      <div className="max-w-[961px] mx-auto md:w-full w-fit">
        <h1 className="text-custom-primary font-inter font-semibold text-xl mb-[18px]">
          REVEIW YOUR INFORMATION
        </h1>
        <p className="font-plus-jakarta-sans font-normal text-base text-white pb-4 mb-2">
          Please check your information for errors. If everything looks good,
          proceed to the next step. Otherwise, go back and edit further.
        </p>
        <h2 className="text-white font-plus-jakarta-sans font-bold text-base mb-9">
          Personal Basic Information
        </h2>
        <PreviewTable previewData={data} />
        <div className="flex justify-between items-center  gap-12 w-full md:flex-row flex-col">
          <Button
            variant={"authBtn"}
            className="max-w-[275px] bg-transparent border-2 border-white h-[75px] "
            onClick={() => setCurrentStep(OnboardingSteps.BASIC_DETAIL)}
          >
            Edit
          </Button>
          <Button
            variant={"authBtn"}
            className="max-w-[275px] h-[75px] "
            onClick={() => replace(urls.onboardingSatus)}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreviewOnboarding;
