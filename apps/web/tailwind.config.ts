import type { Config } from "tailwindcss";

// Type scale and font roles follow the Gotham theme of shagunmistry.com.
export default {
  content: ["./app/**/*.tsx", "./components/**/*.tsx"],
  darkMode: "selector",
  future: { hoverOnlyWhenSupported: true },
  theme: {
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1.4rem", letterSpacing: "0.02em" }],
      sm: ["0.875rem", { lineHeight: "1.5rem" }],
      base: ["1rem", { lineHeight: "1.7rem" }],
      lg: ["1.125rem", { lineHeight: "1.8rem" }],
      xl: ["1.25rem", { lineHeight: "2rem" }],
      "2xl": ["1.5rem", { lineHeight: "2.2rem" }],
      "3xl": ["2rem", { lineHeight: "2.4rem" }],
      "4xl": ["2.75rem", { lineHeight: "2.9rem" }],
      "5xl": ["3.75rem", { lineHeight: "1.06" }],
    },
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Arial Narrow", "sans-serif"],
        sans: ["var(--font-instrument)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
} satisfies Config;
