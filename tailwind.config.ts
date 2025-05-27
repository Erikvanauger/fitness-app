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
        // Updated navbar color - slightly deeper for better contrast
        themegreen: "#7DFFA3",
        // Enhanced selection color with more depth
        navselect: "#059669",
        // New background that matches login theme
        mainbg: "#F0FDFF", // Very light teal/mint
        // Additional colors to match login aesthetic
        
      },
      fontFamily: {
        sans: ["Poppins"],
      },
      backgroundImage: {
        // Custom gradients matching login page
        'wellness-gradient': 'linear-gradient(135deg, #064e3b 0%, #0f766e 50%, #065f46 100%)',
        'light-wellness': 'linear-gradient(135deg, #ecfdf5 0%, #f0fdfa 100%)',
      }
    },
  },
  plugins: [],
} satisfies Config;