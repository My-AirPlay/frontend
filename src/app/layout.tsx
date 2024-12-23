import type { Metadata } from "next";
import "./globals.css";
import {
  Inter,
  Plus_Jakarta_Sans,
  Noto_Sans,
  Rubik,
  Roboto,
} from "next/font/google";
import { cn } from "@/lib/utils";
export const metadata: Metadata = {
  title: "Airplay",
  description: "Music",
};
const inter = Inter({
  subsets: ["latin"],
  weight: "variable",
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
          roboto.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
