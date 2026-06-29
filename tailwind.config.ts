import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dusk-blue": "#3d5a80",
        "powder-blue": "#98c1d9",
        "light-cyan": "#e0fbfc",
        "burnt-peach": "#ee6c4d",
        "jet-black": "#293241",
      },
    },
  },
  plugins: [],
};

export default config;