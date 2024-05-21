import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // screens: {
      //   'sm': '375px',
      //   // => @media (min-width: 576px) { ... }
  
      //   'md': '768px',
      //   // => @media (min-width: 960px) { ... }
  
      //   'lg': '1440px',
      //   // => @media (min-width: 1440px) { ... }
      // },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        "roboto-400": "var(--font-roboto-400)",
        "roboto-500": "var(--font-roboto-500)",
        skyeng: "var(--font-skyeng)",
      },
      colors: {
        background: "#FAFAFA",
        black: "#000000",
        white: "#FFFFFF",
        red: "#DB0030",
        lime: "#BCEC30",
        yellow: "#FFC700",
        orange: "#F7A012",
        salmon: "#FF7E65",
        purple: "#7D458C",
        "blue-dark": "#2491D2",
        "blue-light": "#00C1FF",
        gray: "#D0CECE",
        "gray-light": "#F7F7F7",
      },
      boxShadow: {
        def: "0 4px 67px -12px rgba(0, 0, 0, 0.13)",
      },
    },
  },
  plugins: [],
};
export default config;
