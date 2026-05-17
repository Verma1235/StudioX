/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        float: "float 8s ease-in-out infinite",
        floatSlow: "float 12s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-12px)",
          },
        },
      },
    },
  },
  animation: {
  float: "float 8s ease-in-out infinite",
  floatSlow: "float 12s ease-in-out infinite",
},


  plugins: [],
}