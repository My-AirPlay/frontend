import artist1Img from "@/app/assets/artist-1.png";
import artist2Img from "@/app/assets/artist-2.png";
import artist3Img from "@/app/assets/artist-3.png";
import artist4Img from "@/app/assets/artist-4.png";
import artist5Img from "@/app/assets/artist-5.png";
import artist6Img from "@/app/assets/artist-6.png";
import featureLg1img from "@/app/assets/features-lg-1.png";
import featureLg2img from "@/app/assets/features-lg-2.png";
import featureLg3img from "@/app/assets/features-lg-3.png";
import featureLg4img from "@/app/assets/features-lg-4.png";
import recordingIcon from "@/app/assets/recording-royalties.svg";
import cloudSystemIcon from "@/app/assets/clound-system.svg";
import creatorDashboardIcon from "@/app/assets/creator-dashboard.svg";
import supportIcon from "@/app/assets/support.svg";
import { FeatureCardProps } from "@/components/feature-card";
import { SidebarItemProps } from "@/app/(app)/_components/sidebar-item/sidebar-item.interface";
export enum SingupStep {
  GENERAL,
  BANK,
}
export const uploadSteps = [
  "Music Info",
  "Track Upload",
  "Music Cover",
  "Distribution Preferences",
  "Preview/ Distribute",
];
export const urls = {
  forgotPassword: "/forgot-password",
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
  uploadMusic: "/dashboard/upload",
  onboarding: "/onboarding",
  onboardingSatus: "/onboarding/status",
};

export const artistsImages = [
  artist1Img,
  artist2Img,
  artist3Img,
  artist4Img,
  artist5Img,
  artist6Img,
];

export const featureLgImages = [
  featureLg1img,
  featureLg2img,
  featureLg3img,
  featureLg4img,
];

export const landingPageFeatures: FeatureCardProps[] = [
  {
    title: "Publishing and Recording Royalties",
    descriptions:
      "Fully manage your contract terms, create beautiful and informative royalty statements. Manage your mechanical royalty accounting to publishers.  Ingest sales files from anywhere. Market leading Artist Dashboard. .",
    img: recordingIcon,
  },
  {
    title: "Highly Sufficient Cloud Based System",
    descriptions:
      "Using the best in today's cloud technology, the system scales with the needs or your music royalties. No need to install expensive servers and databases",
    img: cloudSystemIcon,
  },
  {
    title: "Creator’s Dashboard",
    descriptions:
      "AirPlay enhances your service to artists & composers. Using the artist dashboard you’re no longer stuck emailing 100-page PDFs: grant your artists access to retrieve their statements, data & analytics.",
    img: creatorDashboardIcon,
  },
  {
    title: "Support",
    img: supportIcon,
    descriptions:
      "We know how royalties work. Our team has a collective 50 years of experience in royalties. Our goal is to make YOU successful on the platform. We will support you through training & documentation, so you get the most from Airplay.",
  },
];

export const sidebarLinks: SidebarItemProps[] = [
  {
    icon: "f7:timelapse",
    title: "Dashboard",
    route: urls.dashboard,
  },
  {
    icon: "lucide:music",
    title: "Upload Music",
  },
  {
    icon: "ri:disc-fill",
    title: "My Catalog",
  },
  {
    icon: "solar:dollar-broken",
    title: "Royalties",
  },
  {
    icon: "map:accounting",
    title: "Accounting",
  },
  {
    icon: "ic:baseline-support-agent",
    title: "Support",
  },
  {
    icon: "fi:user",
    title: "Account",
  },
];
export enum OnboardingSteps {
  BASIC_DETAIL,
  BANK,
  SOCIAL_LINK,
  PREVIEW,
}
