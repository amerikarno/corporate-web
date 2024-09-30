/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(90, 102, 241)",
        secondary: "rgb(96, 165, 250)",
        success: "rgb(34, 197, 94)",
        info: "rgb(76, 117, 207)",
        warning: "rgb(234, 179, 8)",
        danger: "rgb(244, 63, 94)",
        "body-bg": {
          light: "rgb(242, 246, 249)",
          dark: "rgb(41, 53, 73)",
        },
        "default-text-color": "rgb(71, 85, 105)",
        "default-border": "rgb(243, 243, 243)",
        muted: "rgb(140, 144, 151)",
        "dark-rgb": "rgb(14, 16, 20)",
        "menu-bg": "rgb(255, 255, 255)",
        "menu-border-color": "rgb(243, 243, 243)",
        "menu-prime-color": "rgb(100, 116, 139)",
        "header-bg": "rgb(255, 255, 255)",
        "header-prime-color": "rgb(100, 116, 139)",
        "header-border-color": "rgb(243, 243, 243)",
        "dark-bg": "rgb(30, 41, 59)",
        "dark-bg2": {
          light: "rgb(249, 250, 251)",
          dark: "rgb(30, 41, 59)",
        },
        gold: {
          light: "rgb(235,209,151)",
          mid: "rgb(180,136,17)",
          mid2: "rgb(162,121,13)",
          dark: "rgb(187,155,73)",
        },
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xxl: "1536px",
        s1: "400px",
        s2: "800px",
        s3: "1200px",
      },
      animation: {
        fade: "fadeIn .5s ease-in-out",
      },

      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
