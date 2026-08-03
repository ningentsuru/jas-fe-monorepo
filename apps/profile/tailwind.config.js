/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Scan all your FSD architectural layers for classes
    './app/shared/**/*.{vue,js,ts,jsx,tsx}',
    './app/entities/**/*.{vue,js,ts,jsx,tsx}',
    './app/features/**/*.{vue,js,ts,jsx,tsx}',
    './app/widgets/**/*.{vue,js,ts,jsx,tsx}',
    './app/pages/**/*.{vue,js,ts,jsx,tsx}',
    './app.vue',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
