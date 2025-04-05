import ArtistsSection from "@/components/artists";
import ExploreSection from "@/components/explore";
import LandingPageFooter from "@/components/footer";
import FeaturesSection from "@/components/landing-page/features/features";
import HeroSection from "@/components/landing-page/hero/hero";
// import { urls } from "@/lib/constants";
// import { redirect } from "next/navigation";

export default function Home() {
  // redirect(urls.dashboard);
  return (
    <main className="bg-custom-background min-h-svh flex flex-col gap-6">
      <HeroSection />

      <ArtistsSection />

      <FeaturesSection />

      <ExploreSection />

      <LandingPageFooter />
    </main>
  );
}
