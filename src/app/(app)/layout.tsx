import { ReactNode } from "react";
import AppLayoutClient from "./app-layout.client";
import { getArtistProfile } from "@/actions/auth/auth.action";
import { redirect } from "next/navigation";
import { onboardingStagesKey, urls } from "@/lib/constants";

interface AppLayoutProps {
  children: ReactNode;
}
const AppLayout = async ({ children }: AppLayoutProps) => {
  const user = await getArtistProfile();
  if (!user) {
    redirect(urls.login);
  }

  if (onboardingStagesKey.includes(user.stage)) {
    redirect(urls.onboarding);
  }

  return <AppLayoutClient>{children}</AppLayoutClient>;
};

export default AppLayout;
