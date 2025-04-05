import { getArtistProfile } from "@/actions/auth/auth.action";
import CustomAppLayout from "@/components/app-layout/app-layout";
import { urls, userProfileStage } from "@/lib/constants";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
interface AuthLayoutProps {
  children: ReactNode;
}
const AuthLayout = async ({ children }: AuthLayoutProps) => {
  const user = await getArtistProfile();
  if (user)
    redirect(
      user.stage === userProfileStage.onboarding
        ? urls.onboarding
        : urls.dashboard
    );
  return <CustomAppLayout showIcons>{children}</CustomAppLayout>;
};

export default AuthLayout;
