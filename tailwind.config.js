/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { inter: ['Inter', 'system-ui', 'sans-serif'] },
      colors: {
        pagebg: '#F7F8FB',
        sidebar: '#0F172A',
        primary: '#2563EB',
      },
    },
  },
  plugins: [],
}
