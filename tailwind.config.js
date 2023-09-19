/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      txs: "512px",
      // => @media (min-width: 512px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
      mobile: { max: "1007px" },
      desktop: { min: "1008px" },
    },
    extend: {
      colors: {
        dark: "black",
        light: "white",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
  safelist: [
    {
      pattern: /(bg|text|border|shadow-outer-lg)-(dark|light)/,
    },
  ],
};
