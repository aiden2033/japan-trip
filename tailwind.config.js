/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        osaka: '#e11d48',
        kyoto: '#7c3aed',
        tokyo: '#2563eb',
      },
    },
  },
  plugins: [],
};
