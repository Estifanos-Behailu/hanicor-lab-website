import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#060914",
        foreground: "#E0E7FF",
        primary: {
          DEFAULT: "#0A192F",
          foreground: "#E0E7FF",
        },
        secondary: {
          DEFAULT: "#1E293B",
          foreground: "#E0E7FF",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#334155",
          foreground: "#A0AEC0",
        },
        accent: {
          DEFAULT: "#00E5FF",
          foreground: "#060914",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "rgba(10, 25, 47, 0.8)",
          foreground: "#E0E7FF",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "gradient-pan": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(0, 229, 255, 0.3), 0 0 8px rgba(0, 229, 255, 0.2)" },
          "50%": { boxShadow: "0 0 8px rgba(0, 229, 255, 0.5), 0 0 12px rgba(0, 229, 255, 0.3)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "gradient-pan": "gradient-pan 15s ease infinite",
        "pulse-glow": "pulse-glow 2s infinite ease-in-out",
        "float": "float 4s ease-in-out infinite",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
        cinematic: ["Bebas Neue", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(-45deg, #0A192F, #060914, #0A192F, #1E3A5F)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config