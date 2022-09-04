/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'nav-grid': '40px 1fr',
      },
      backgroundColor: {
        decorator: '#1645bd',
      },

      decorator: {
        width: '30px',
      },
    },
  },
  plugins: [],
};
