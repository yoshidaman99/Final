/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'admin' : '#88B77B',
        'txtadmin': '#FFA870',
        'update' : '#FF0303',
        'message' : '#F9DBBB',
        'news' : '#4E6E81',
     },
     spacing: {
        '350' : '350px',
     },
    },
  },
  plugins: [],
}
