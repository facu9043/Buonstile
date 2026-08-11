/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0D0D0D",
        paper: "#F6F5F1",
        papershade: "#EEEDE7",
        line: "#DCDAD3",
        stone: "#8A877E",
        whatsapp: "#25D366",
      },
      fontFamily: {
        display: ["'Permanent Marker'", "cursive"],
        heading: ["'Archivo Black'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
