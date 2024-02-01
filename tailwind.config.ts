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
        konfidens: {
          green: "#168965",
          darkGreen: "#064f43",
          white: "#f9fafb",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
export default config;
