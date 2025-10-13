/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'navy-blue': '#1e3a5f',
        'gold': {
          500: '#f4b942',
          600: '#e5a832',
        },
        'light-blue': '#4a90e2',
        'success-green': '#81B29A',
      },
    },
  },
  plugins: [],
}
