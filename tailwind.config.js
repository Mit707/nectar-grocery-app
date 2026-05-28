/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#53B175',
          dark: '#379B66',
          light: '#E8F5EE',
        },
        nectar: {
          black: '#181725',
          gray: '#7C7C7C',
          light: '#B3B3B3',
          bg: '#F2F3F2',
          border: '#E2E2E2',
          error: '#F4511E',
          orange: '#F8A44C',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      screens: {
        xs: '375px',
      },
      boxShadow: {
        card: '0 2px 12px rgba(0,0,0,0.08)',
        'card-lg': '0 4px 20px rgba(0,0,0,0.10)',
        nav: '0 -2px 12px rgba(0,0,0,0.06)',
      },
      backgroundImage: {
        'auth-gradient': "url('/header_bg.png')",
      },
    },
  },
  plugins: [],
}
