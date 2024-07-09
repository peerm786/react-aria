import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      scrollbarWidth: {
        thin: "thin",
        custom: "10px", // Example custom width
      },
      // Add custom colors for scrollbar
      colors: {
        "scrollbar-track": "#f1f1f1", // Example track color
        "scrollbar-thumb": "#888", // Example thumb color
        "scrollbar-thumb-hover": "#555", // Example hover state thumb color
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
export default config;
