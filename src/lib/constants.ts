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
import analyticsIcon from "@/app/assets/feature-icons/analytics.svg";
import analytics from "@/app/assets/features/analytics.png";
import smartlinkIcon from "@/app/assets/feature-icons/smartlink.svg";
import smartlink from "@/app/assets/features/smartlink.png";
import uploadIcon from "@/app/assets/feature-icons/upload.svg";
import upload from "@/app/assets/features/upload.png";
import swiftIcon from "@/app/assets/feature-icons/swift.svg";
import swift from "@/app/assets/features/swift.png";
import statisticsIcon from "@/app/assets/feature-icons/statistics.svg";
import statistics from "@/app/assets/features/statistics.png";
import videoUpload from "@/app/assets/features/video-upload.png";
import { FeatureCardProps } from "@/components/landing-page/features/features-card";
import { SidebarItemProps } from "@/app/(app)/_components/sidebar-item/sidebar-item.interface";
import { MediaCardProps } from "@/app/(app)/catalog/_components/media-type/media-type.interface";
import { StaticImageData } from "next/image";
import albumImg from "@/app/assets/album.png";
import extendedImg from "@/app/assets/extended-playlist.png";
import trackImg from "@/app/assets/track.png";
export enum SingupStep {
  GENERAL,
  BANK,
}

export const urls = {
  forgotPassword: "/forgot-password",
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
  uploadMusic: "/upload",
  uploadAlbum: "/upload/album",
  onboarding: "/onboarding",
  onboardingSatus: "/onboarding/status",
  settings: "/settings",
  editProfile: "/settings/edit-profile",
  settingsPassword: "/settings/password",
  changePassword: "/settings/edit-password",
  editBank: "/settings/edit-bank",
  settingsBank: "/settings/bank",
  notification: "/settings/notification",
  catalog: "/catalog",
};

export const settingsLinks: {
  title: string;
  route: string;
  subRoute: string;
}[] = [
  {
    title: "Profile Information",
    route: urls.settings,
    subRoute: urls.editProfile,
  },
  {
    title: "Password",
    route: urls.settingsPassword,
    subRoute: urls.changePassword,
  },
  {
    title: "Bank Details",
    route: urls.settingsBank,
    subRoute: urls.editBank,
  },
  {
    title: "Notifications",
    route: urls.notification,
    subRoute: "",
  },
];
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
    title: "Music Uploads",
    description:
      "Upload tracks with support for multiple formats, ensuring seamless distribution to all major platforms ",
    background: upload,
    icon: uploadIcon,
  },
  {
    title: "Music Uploads",
    description:
      "Upload high-quality videos to showcase your music and engage your audience across top streaming platforms",
    background: videoUpload,
    icon: uploadIcon,
  },
  {
    title: "Earnings & Analytics",
    description:
      "Track your revenue, streaming stats, and audience insights in real-time ",
    background: analytics,
    icon: analyticsIcon,
  },
  {
    title: "Sharable Smart Link ",
    description:
      "Customized, shareable links that connect your audience directly to your music across all major streaming platforms ",
    background: smartlink,
    icon: smartlinkIcon,
  },
  {
    title: "Swift Onboarding",
    description:
      "Get started in minutes with a simple, user-friendly setup process designed to get your music out to the world faster",
    background: swift,
    icon: swiftIcon,
  },
  {
    title: "Daily Statistics",
    description:
      "Stay updated with daily insights on your streams, audience engagement, and earnings",
    background: statistics,
    icon: statisticsIcon,
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
    route: urls.uploadMusic,
  },
  {
    icon: "ri:disc-fill",
    title: "My Catalog",
    route: urls.catalog,
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
    icon: "prime:user",
    title: "Account",
    route: urls.settings,
  },
];
export enum OnboardingSteps {
  BASIC_DETAIL,
  BANK,
  SOCIAL_LINK,
  PREVIEW,
}

export const metricsDate = ["daily", "monthly", "yearly"];

export const MEDIAS: {
  [key: string]: MediaCardProps[];
} = {
  music: [
    {
      author: "Myself",
      title: "Cinnamon gril",
    },
    {
      author: "Myself",
      title: "Mahesty",
    },
  ],
  video: [
    {
      author: "Myself",
      title: "Cinnamon gril",
      fallbackIcon: "icon-park-outline:video-two",
    },
    {
      author: "Myself",
      title: "Mahesty",
      fallbackIcon: "icon-park-outline:video-two",
    },
  ],
};

export enum UPLOAD_TYPE {
  TRACK = "TRACK",
  ALBUM = "ALBUM",
  EXTENDED_PLAYLIST = "EXTENDED_PLAYLIST",
  MIX_TAPE = "MIX_TAPE",
}

export const uploadTypes: {
  title: string;
  img: StaticImageData;
  type: UPLOAD_TYPE;
}[] = [
  {
    title: "Track",
    type: UPLOAD_TYPE.TRACK,
    img: trackImg,
  },
  {
    title: "Album",
    type: UPLOAD_TYPE.ALBUM,
    img: albumImg,
  },
  {
    title: "Extended Playlist (EP)",
    type: UPLOAD_TYPE.EXTENDED_PLAYLIST,
    img: extendedImg,
  },
  {
    title: "Mix Tape",
    type: UPLOAD_TYPE.MIX_TAPE,
    img: albumImg,
  },
];

export enum UPLOAD_STEPS {
  MUSIC_INFO,
  TRACK_UPLOAD,
  MUSIC_COVER,
  DISTRIBUTION_PREFERENCE,
  PREVIEW,
}

export const uploadSteps: {
  title: string;
  step: UPLOAD_STEPS;
}[] = [
  {
    title: "Music Info",
    step: UPLOAD_STEPS.MUSIC_INFO,
  },
  {
    title: "Track Upload",
    step: UPLOAD_STEPS.TRACK_UPLOAD,
  },
  {
    title: "Music Cover",
    step: UPLOAD_STEPS.MUSIC_COVER,
  },
  {
    title: "Distribution Preferences",
    step: UPLOAD_STEPS.DISTRIBUTION_PREFERENCE,
  },
  {
    title: "Preview/ Distribute",
    step: UPLOAD_STEPS.PREVIEW,
  },
];

export const GENRES = ["Hip pop", "Blues", "Regae"];

export const paymentOptions = [
  {
    label: "Monthly",
    value: "monthly",
  },
  {
    label: "Quarterly",
    value: "quarterly",
  },
  {
    label: "Annually",
    value: "annually",
  },
];

export const currencyOptions = [
  {
    label: "₦ (Naira)",
    value: "₦ (Naira)",
  },
  {
    label: "$ (USD)",
    value: "$ (USD)",
  },
  {
    label: "€ (Euro)",
    value: "€ (Euro)",
  },
  {
    label: "£ (Pounds)",
    value: "£ (Pounds)",
  },
];
