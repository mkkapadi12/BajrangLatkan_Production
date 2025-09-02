/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"], // enable dark mode via `class`
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bajrang: {
          // Brand Identity
          brand: "#7B1E3A", // Professional Maroon (primary brand color)
          accent: "#EFB700", // Warm Gold (highlight/accent)
          secondary: "#005B96", // Professional Blue (secondary actions, links)

          // Backgrounds
          bg: "#F8FAFC", // Light Gray-White (main background)
          surface: "#FFFFFF", // White (panels, cards, sections)
          surfaceAlt: "#F1F5F9", // Subtle Gray (alternate row backgrounds)

          // Text
          text: "#1E293B", // Almost Black (main text)
          textSecondary: "#475569", // Slate Gray (secondary text, labels)
          muted: "#94A3B8", // Muted gray (disabled, hints)

          // States
          success: "#16A34A", // Emerald Green (success/approved)
          warning: "#F59E0B", // Amber Orange (alerts / pending)
          danger: "#DC2626", // Strong Red (errors/rejection)
          info: "#0284C7", // Blue (notifications/info)

          // Borders & Shadows
          border: "#E2E8F0", // Light Gray border
          divider: "#CBD5E1", // Divider lines
          shadow: "rgba(0, 0, 0, 0.1)", // Soft shadow

          // Interactive States
          hover: "#F3F4F6", // Hover gray background
          active: "#E2E8F0", // Active/selected state background
          focus: "#3B82F6", // Blue focus ring
        },

        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
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
      },
      fontFamily: {
        brand: ["Poppins", "Roboto", "sans-serif"], // clean + professional
        heading: ["Merriweather", "serif"], // classy headings
      },
      boxShadow: {
        soft: "0 2px 10px rgba(0,0,0,0.08)",
        gold: "0 0 10px #FFD700",
      },
      borderRadius: {
        xl: "1rem",
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
