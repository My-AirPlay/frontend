/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        custom: {
          background: "#2F3133",
          banner_bg: "#484848",
          primary: {
            DEFAULT: "#FE6902",
          },
          "profile-btn": "#1B2128",
          link: "#F1E4E7",
          auth_stroke: "#4D4D4D",
          footer_border: "#A6A6A6",
          registration_link: "#7B7B7B",
          input_dark: "#383838",
          input_light: "#4C4C4D",
          "icon-btn-border": "#FCFCFC",
          "check-box": "#505050",
          "sidebar-stroke": "#2F363E",
          sidebar: "#303030",
          "page-bg": "#121212",
          "hero-card": "#292525",
          "features-card": "#2D2929",
          error: "#EB5757",
          "dark-blue": "#1B1C31",
          dot: "#E0E0E0",
          "footer-stroke": "#404444",
          "sidebar-inactive": "#7B7B7B",
          "mobile-nav": "#252525",
          "edit-modal": "#505050",
          "profile-icon": "#B0B0B0",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: {
        60: "60px",
        64: "64px",
        40: "40px",
        25: "25px",
        28: "28px",
        30: "30px",
        90: "90px",
        14: "14px",
        50: "50px",
        80: "80px",
      },
      maxWidth: {
        778: "778px",
        "auth-card": "603px",
        "icon-btn": "158px",
        page: "1343px",
        sidebar: "106px",
        "preview-width": "961px",
      },
      fontFamily: {
        "plus-jakarta-sans": ["var(--font-jakarta-sans)"],
        "noto-sans": ["var(--font-noto-sans)"],
        rubik: ["var(--font-rubik)"],
        roboto: ["var(--font-roboto)"],
        poppins: ["var(--font-poppins)"],
        manrope: ["var(--font-manrope)"],
        inter: ["var(---font-inter)"],
      },
      boxShadow: {
        "auth-card": "-8px 4px 5px rgba(0,0,0,0.24)",
      },
      minHeight: {
        "auth-card": "796px",
      },
      height: {
        "auth-btn": "75px",
      },
      minWidth: {
        sidebar: "106px",
      },
      screens: {
        mid: "900px",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")],
} satisfies Config;
