/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',  // Ensure this includes all files where Tailwind CSS classes are used
  ],
  theme: {
    extend: {
      fontFamily: {
        eczar: ['"Eczar"', 'serif'],
        
      },
    },
  },
  plugins: [],
};
