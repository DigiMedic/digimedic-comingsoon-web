/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blumine: {
          DEFAULT: '#1b4d6a',
          dark: '#134058',
        },
        astral: '#5b8a9a',
        'fountain-blue': '#5ba2c2',
        'powder-blue': '#a8d4e1',
        polar: '#ffffff',
      },
      fontFamily: {
        'space': ['Space Mono', 'monospace'],
        'space-bold-regular': ['Space Mono', 'monospace'],
        'space-bold-semibold': ['Space Mono', 'monospace'],
        'raleway': ['Raleway', 'sans-serif'],
        'raleway-regular': ['Raleway', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'subtle-move': 'subtleMove 2s ease-in-out infinite',
        'gradient-x': 'gradientX 15s ease infinite',
        marquee: 'marquee var(--duration) linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        subtleMove: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      transitionTimingFunction: {
        'standard': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
