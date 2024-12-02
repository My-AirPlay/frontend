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
          link: "#F1E4E7",
          auth_stroke: "#4D4D4D",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: {
        64: "64px",
        40: "40px",
        25: "25px",
        30: "30px",
        90: "90px",
      },
      maxWidth: {
        778: "778px",
        "auth-card": "480px",
      },
      fontFamily: {
        "plus-jakarta-sans": ["var(--font-jarkarta-sans)"],
        "noto-sans": ["var(--font-noto-sans)"],
        rubik: ["var(--font-rubik)"],
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
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
