// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class', // Enable dark mode with class strategy
    theme: {
      extend: {
        colors: {
          // You can customize your color palette here
        },
      },
    },
    plugins: [],
  }