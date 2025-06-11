import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
      sm: '640px',
      md: '768px', 
      lg: '1140px',
      xl: '1280px',
    },
      colors: {
        background: "#373737",
        foreground: "var(--foreground)",
        themegreen: "#7DFFA3",
        navselect: "#059669",
        mainbg: "#F0FDFF",
        
      },
      fontFamily: {
        sans: ["Poppins"],
      },
      backgroundImage: {
        'wellness-gradient': 'linear-gradient(135deg, #064e3b 0%, #0f766e 50%, #065f46 100%)',
        'light-wellness': 'linear-gradient(135deg, #ecfdf5 0%, #f0fdfa 100%)',
      }
    },
  },
  plugins: [],
} satisfies Config;