/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1E3A8A',
        'secondary': '#3B82F6',
        'accent': '#06B6D4',
        'background-dark': '#0F172A',
        'background': '#1E293B',
        'text-light': '#F8FAFC',
        'text-gray': '#94A3B8',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'space': ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 