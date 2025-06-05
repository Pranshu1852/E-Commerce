/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'autofill-250': 'repeat(auto-fill, minmax(270px, 1fr))',
      },
    },
  },
  plugins: [],
};
