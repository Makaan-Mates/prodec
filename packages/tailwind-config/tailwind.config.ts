import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "../../apps/**/*.{js,ts,jsx,tsx,mdx}",

    //unresolved paths
    "../packages/ui/components/**/*.{ts,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
