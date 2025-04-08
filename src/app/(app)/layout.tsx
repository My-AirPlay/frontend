'use client'
import React, { ReactNode } from "react";
import AppLayoutClient from "./app-layout.client";
import { redirect } from "next/navigation";
import { onboardingStagesKey, urls } from "@/lib/constants";
import { getArtistProfile } from "@/contexts/AuthContextArtist";

interface AppLayoutProps {
  children: ReactNode;
}
const AppLayout = ({ children }: AppLayoutProps) => {
  React.useEffect(() => {
    const fetchUser = async () => {
      const user = await getArtistProfile();
      if (!user) {
        redirect(urls.login);
      }
      if (user) {
        if (onboardingStagesKey.includes(user.stage)) {
          redirect(urls.onboarding);
        }
        
      }
    };
    fetchUser();
  }, []);

  return <AppLayoutClient>{children}</AppLayoutClient>;
};

export default AppLayout;
