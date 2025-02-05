import { getAccessToken, getUserProfile } from "@/actions/auth/auth.action";
import OnboardingClientPage from "./onboarding.client";
import { redirect } from "next/navigation";
import { urls, userProfileStage } from "@/lib/constants";
const OnboardingPage = async () => {
  const accessToken = await getAccessToken();
  const user = await getUserProfile(accessToken?.value || "");
  if (!user) {
    redirect(urls.login);
  }
  if (user.stage !== userProfileStage.onboarding) {
    redirect(urls.dashboard);
  }
  return <OnboardingClientPage email={user.email} />;
};

export default OnboardingPage;
