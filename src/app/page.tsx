import ArtistsSection from "@/components/artists";
import ExploreSection from "@/components/explore";
import LandingPageFooter from "@/components/footer";
import FeaturesSection from "@/components/landing-page/features/features";
import HeroSection from "@/components/landing-page/hero/hero";

export default function Home() {
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
