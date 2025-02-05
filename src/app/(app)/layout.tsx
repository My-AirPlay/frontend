import { ReactNode } from "react";
import AppLayoutClient from "./app-layout.client";
// import { getAccessToken, getUserProfile } from "@/actions/auth/auth.action";
// import { redirect } from "next/navigation";
// import { urls, userProfileStage } from "@/lib/constants";

interface AppLayoutProps {
  children: ReactNode;
}
const AppLayout = async ({ children }: AppLayoutProps) => {
  // const accessToken = await getAccessToken();
  // const user = await getUserProfile(accessToken?.value || "");
  // if (!user) {
  //   redirect(urls.login);
  // }

  // if (user?.stage === userProfileStage.onboarding) {
  //   redirect(urls.onboarding);
  // }

  return <AppLayoutClient>{children}</AppLayoutClient>;
};

export default AppLayout;
