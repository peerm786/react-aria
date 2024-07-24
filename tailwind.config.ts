// tailwind.config.js

const { colors } = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class", // Enable the 'class' mode for dark mode
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
      colors: {
        dark: "#333", // Example dark mode background color
        "scrollbar-track": "#f1f1f1", // Example track color
        "scrollbar-thumb": "#888", // Example thumb color
        "scrollbar-thumb-hover": "#555", // Example hover state thumb color
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["dark"], // Enable dark mode variant for background colors
      textColor: ["dark"], // Enable dark mode variant for text colors
    },
  },
  plugins: [
    require("tailwind-scrollbar"), // Example plugin for custom scrollbars
      function ({ addUtilities }:any) {
      addUtilities({
        '.scrollbar-hide': {
          /* Hide scrollbar for Chrome, Safari and Opera */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          /* Hide scrollbar for IE, Edge and Firefox */
          '-ms-overflow-style': 'none',  /* IE and Edge */
          'scrollbar-width': 'none',  /* Firefox */
        },
      });
    },
  ],
};
