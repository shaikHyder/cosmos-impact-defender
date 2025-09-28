import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
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
        // Cosmic color extensions
        cosmic: {
          50: "hsl(217 100% 95%)",
          100: "hsl(217 100% 85%)",
          500: "hsl(217 100% 65%)",
          600: "hsl(217 100% 55%)",
          900: "hsl(217 100% 25%)",
        },
        nebula: {
          500: "hsl(250 50% 25%)",
          600: "hsl(250 50% 20%)",
          800: "hsl(250 50% 15%)",
        },
        stellar: {
          400: "hsl(45 100% 75%)",
          500: "hsl(45 100% 70%)",
          600: "hsl(45 100% 65%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "twinkle": "twinkle 3s ease-in-out infinite alternate",
        "float": "float 3s ease-in-out infinite",
        "stellar-glow": "stellar-glow 2s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-cosmic": "var(--gradient-cosmic)",
        "gradient-nebula": "var(--gradient-nebula)",
        "gradient-stellar": "var(--gradient-stellar)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
