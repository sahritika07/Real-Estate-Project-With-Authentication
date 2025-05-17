/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '4.75xl': '2.625rem', // Slightly smaller than 5xl (3rem = 48px, so 2.625rem ~ 42px)
      },
    },
  },
  plugins: [],
}

