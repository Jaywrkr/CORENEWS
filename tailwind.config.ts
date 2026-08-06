import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#EEF0FB",
          100: "#D6DBF5",
          200: "#AEB7EC",
          300: "#8590DE",
          400: "#5C68C9",
          500: "#3C48AD",
          600: "#242E8C",
          700: "#141C70",
          800: "#0A1252",
          900: "#050B38",
          950: "#01095C",
        },
        accent: {
          DEFAULT: "#2B3EF0",
          hover: "#1E2ED1",
        },
        ink: {
          0: "#FFFFFF",
          50: "#F6F7FB",
          100: "#EBEDF5",
          200: "#D8DBE8",
          300: "#B9BECF",
          400: "#8A90A8",
          500: "#666C86",
          600: "#4B5068",
          700: "#363A4F",
          800: "#22243A",
          900: "#14152A",
          950: "#0B0C1A",
        },
        success: "#1E8A4C",
        warning: "#E0A800",
        danger: "#C42A2A",
      },
      fontFamily: {
        sans: ["var(--font-plex-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-plex-serif)", "ui-serif", "Georgia", "serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        none: "0px",
        DEFAULT: "0px",
        sm: "0px",
        md: "0px",
        lg: "0px",
        pill: "999px",
      },
      maxWidth: {
        content: "1280px",
      },
      spacing: {
        "02": "4px",
        "03": "8px",
        "04": "12px",
        "05": "16px",
        "06": "24px",
        "07": "32px",
        "09": "48px",
        "10": "64px",
      },
      backgroundImage: {
        "grid-navy":
          "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "24px 24px",
      },
      boxShadow: {
        lift: "0 16px 32px -16px rgba(1, 9, 92, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
