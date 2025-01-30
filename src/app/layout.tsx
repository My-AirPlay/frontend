import type { Metadata } from "next";
import "./globals.css";
import {
  Inter,
  Plus_Jakarta_Sans,
  Noto_Sans,
  Rubik,
  Roboto,
  Poppins,
  Manrope,
} from "next/font/google";
import { cn } from "@/lib/utils";
// import DemoLinks from "@/components/demo/demo";
import NextTopLoader from "nextjs-toploader";
import ReactQueryProvider from "./_query-provider/provider.client";
import { Toaster } from "@/components/ui/sonner";
export const metadata: Metadata = {
  title: "Airplay",
  description: "Music",
};
const inter = Inter({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-inter",
});
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta-sans",
  weight: "variable",
});
const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  weight: "variable",
});
const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  weight: "variable",
});
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: "variable",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={cn(
          inter.className,
          plusJakartaSans.variable,
          notoSans.variable,
          rubik.variable,
          roboto.variable,
          poppins.variable,
          manrope.variable,
          inter.variable
        )}
      >
        <NextTopLoader zIndex={99999999999} color="#FE6902" />
        {/* <DemoLinks /> */}
        <ReactQueryProvider>
          {children}
          <Toaster duration={5000} position="bottom-right" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
