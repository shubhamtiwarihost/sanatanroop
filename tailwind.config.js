/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Sanatan Granth Sophisticated Palette
        ivory: {
          50: '#fdfcf9',
          100: '#fbf8f2',
          200: '#f6efe3',
          300: '#eddcc5',
          400: '#e1caa5',
        },
        charcoal: {
          950: '#0a0a0d',
          900: '#121216',
          850: '#18171e',
          800: '#22212a',
          700: '#32303c',
          600: '#474554',
        },
        gold: {
          50: '#faf6eb',
          100: '#f2e8cc',
          200: '#e5d199',
          300: '#d8b965',
          400: '#cba243',
          500: '#c5a059', // Antique Gold
          600: '#b08b3e',
          700: '#8e6d2b',
          800: '#6d5220',
          900: '#4e3a15',
        },
        saffron: {
          500: '#c25e1a', // Muted Saffron
          600: '#a64d12',
          700: '#8c3d0b',
        },
        maroon: {
          600: '#7a1f25', // Subtle Sacred Maroon / Kumkum
          700: '#5c1519',
          800: '#460e12',
          900: '#2e080b',
        },
        sandalwood: {
          800: '#382014', // Deep Temple Wood
          900: '#26140b',
          950: '#1a0d07',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Baskerville', 'serif'],
        devanagari: [
          'Noto Serif Devanagari',
          'Siddhanta',
          'Rozha One',
          'Martel',
          'Georgia',
          'serif',
        ],
      },
      backgroundImage: {
        'gold-foil': 'linear-gradient(135deg, #d8b965 0%, #c5a059 50%, #8e6d2b 100%)',
        'sacred-dark': 'linear-gradient(180deg, #0d0d10 0%, #15141b 100%)',
        'parchment-glow': 'radial-gradient(ellipse at top, #faf3e0 0%, #f6efe3 70%)',
      },
      animation: {
        'om-pulse': 'omPulse 4s ease-in-out infinite',
        'light-wave': 'lightWave 3s ease-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        omPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.92', filter: 'drop-shadow(0 0 25px rgba(216,185,101,0.4))' },
          '50%': { transform: 'scale(1.03)', opacity: '1', filter: 'drop-shadow(0 0 50px rgba(216,185,101,0.75))' },
        },
        lightWave: {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
