import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        tamil: ["Noto Sans Tamil", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 1s ease-out forwards",
        "slide-up": "slideUp 0.8s ease-out forwards",
        "scale-in": "scaleIn 0.6s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "text-shimmer": "textShimmer 3s ease-in-out infinite",
        "background-pan": "backgroundPan 20s linear infinite",
        "gentle-bounce": "gentleBounce 2s ease-in-out infinite",
        "smooth-scale": "smoothScale 0.3s ease-out",
        "parallax-slow": "parallaxSlow 30s linear infinite",
        "parallax-medium": "parallaxMedium 20s linear infinite",
        "parallax-fast": "parallaxFast 15s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(251, 146, 60, 0.3)",
            transform: "scale(1)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(251, 146, 60, 0.6)",
            transform: "scale(1.02)",
          },
        },
        textShimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        backgroundPan: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        gentleBounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        smoothScale: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" },
        },
        parallaxSlow: {
          "0%": { transform: "translateY(0px) translateX(0px)" },
          "100%": { transform: "translateY(-20px) translateX(-10px)" },
        },
        parallaxMedium: {
          "0%": { transform: "translateY(0px) translateX(0px)" },
          "100%": { transform: "translateY(-40px) translateX(20px)" },
        },
        parallaxFast: {
          "0%": { transform: "translateY(0px) translateX(0px)" },
          "100%": { transform: "translateY(-60px) translateX(-30px)" },
        },
      },
      backgroundImage: {
        "hero-pattern": "url('/placeholder.svg?height=1080&width=1920')",
        "cultural-pattern": "url('/placeholder.svg?height=800&width=1600')",
        "stage-lights": "url('/placeholder.svg?height=600&width=1200')",
        "traditional-art": "url('/placeholder.svg?height=800&width=1600')",
        "waves": "url('/bg-waves.png')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
