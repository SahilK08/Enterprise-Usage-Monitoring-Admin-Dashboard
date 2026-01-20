/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0f172a', // Slate 900
          800: '#1e293b', // Slate 800
          700: '#334155', // Slate 700
          glass: 'rgba(30, 41, 59, 0.7)',
        },
        primary: {
          DEFAULT: '#3b82f6', // Blue 500
          glow: 'rgba(59, 130, 246, 0.5)',
        },
        accent: {
          DEFAULT: '#10b981', // Emerald 500
          glow: 'rgba(16, 185, 129, 0.5)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
