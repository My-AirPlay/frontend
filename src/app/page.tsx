import HeroSection from "@/components/hero";
import LandingPageFooter from "@/components/footer";
import ArtistsSection from "@/components/artists";
import ExploreSection from "@/components/explore";
import FeaturesSection from "@/components/features";

export default function Home() {
  return (
    <main className="min-h-svh pb-10 bg-custom-background overflow-hidden">
      <HeroSection />
      <ArtistsSection />
      <FeaturesSection />
      <ExploreSection />
      <LandingPageFooter />
    </main>
  );
}
