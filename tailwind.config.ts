import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#373737",
        foreground: "var(--foreground)",
        themegreen: "#9FFFAB",
        navselect: "#6FB878",
        mainbg:"#D8F6FF",
      },
      fontFamily: {
        sans: ["Poppins", ],
      },
    },
  },
  plugins: [],
} satisfies Config;
