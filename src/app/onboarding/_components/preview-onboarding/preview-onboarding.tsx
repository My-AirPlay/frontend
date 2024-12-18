import { Button } from "@/components/ui/button";
import React, { Fragment } from "react";

const PreviewOnboarding = () => {
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
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 items-start justify-between md:mb-[59px] mb-[110px]">
          {data.map((data, i) => (
            <div className="grid gap-y-4 grid-cols-2 " key={i}>
              {data.map((onboardingInfo) => (
                <Fragment key={onboardingInfo.title}>
                  <small className="font-plus-jakarta-sans  text-white font-semibold h-9 text-base">
                    {onboardingInfo.title}
                  </small>
                  <small className="font-plus-jakarta-sans  text-white font-semibold text-base">
                    {onboardingInfo.value || "--"}
                  </small>
                </Fragment>
              ))}
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center  gap-12 w-full md:flex-row flex-col">
          <Button
            variant={"authBtn"}
            className="max-w-[275px] bg-transparent border-2 border-white h-[75px] "
          >
            Edit
          </Button>
          <Button variant={"authBtn"} className="max-w-[275px] h-[75px] ">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreviewOnboarding;
