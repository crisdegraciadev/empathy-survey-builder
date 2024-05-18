/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        white: {
          DEFAULT: '#FFFFFF',
          25: '#F5FAFF',
          50: '#EFF8FF',
        },
        blue: {
          600: '#1570EF',
          700: '#175CD3',
        },
        gray: {
          25: '#FCFCFD',
          50: '#F9FAFB',
          300: '#D0D5DD',
          400: '#98A2B3',
          500: '#667085',
          600: '#363F47',
          700: '#344054',
          800: '#193154',
          900: '#101828',
        },
      },
    },
  },
  plugins: [],
};
