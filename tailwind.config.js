/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./index.html"
  ],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#05B6D3",
        secondary: "#Ef863E",
      },
      backgroundImage: {
        'login-bg': "url('/src/assets/images/bg-images.png')",
        'signup-bg': "url('/src/assets/images/signup-image.png')"
      }
    },
  },
  plugins: [],
}