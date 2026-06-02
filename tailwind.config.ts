import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        deep: "#08080f",
        primary: "#0e1018",
        card: "rgba(14, 16, 24, 0.6)",
        "accent-cyan": "#d06050",
        "accent-purple": "#855060",
        "accent-pink": "#c44850",
        "text-primary": "#eae6e4",
        "text-secondary": "#8a95a5",
        "text-muted": "#5a6575",
        "border-subtle": "rgba(255,255,255,0.06)",
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
