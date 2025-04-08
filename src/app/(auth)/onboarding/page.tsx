import OnboardingClientPage from "./onboarding.client";
import { redirect } from "next/navigation";
import { onboardingStagesKey, urls } from "@/lib/constants";
import { getArtistProfile } from "@/contexts/AuthContextArtist";
const OnboardingPage = async () => {
  const user = await getArtistProfile();
  console.log(user);
  if (!user) {
    redirect(urls.login);
  }

  if (!onboardingStagesKey.includes(user.stage)) {
    redirect(urls.dashboard);
  }
  return <OnboardingClientPage stage={user.stage} email={user.email} />;
};

export default OnboardingPage;
