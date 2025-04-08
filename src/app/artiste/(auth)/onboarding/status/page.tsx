import CustomAppLayout from "@/components/app-layout/app-layout";
import React from "react";
import OnboardingApprovalStatus from "../_components/approval-status/approval-status";

const OnboardingStatusPage = () => {
  return (
    <CustomAppLayout>
      <OnboardingApprovalStatus />
    </CustomAppLayout>
  );
};

export default OnboardingStatusPage;
