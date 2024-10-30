/** @type {import('tailwindcss').Config} */
const typography = require('@tailwindcss/typography');

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
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.astral'),
            '--tw-prose-headings': theme('colors.blumine.DEFAULT'),
            '--tw-prose-links': theme('colors.fountain-blue'),
            '--tw-prose-bold': theme('colors.blumine.DEFAULT'),
            '--tw-prose-quotes': theme('colors.astral'),
            '--tw-prose-quote-borders': theme('colors.blumine.DEFAULT'),
            '--tw-prose-pre-bg': theme('colors.blumine.dark'),
            '--tw-prose-pre-code': theme('colors.powder-blue'),

            fontSize: '1.125rem',
            maxWidth: 'none',

            h1: {
              fontFamily: theme('fontFamily.raleway').join(', '),
              fontSize: '2.5rem',
              marginBottom: '2rem',
              fontWeight: '700',
            },
            h2: {
              fontFamily: theme('fontFamily.raleway').join(', '),
              fontSize: '2rem',
              marginTop: '2.5rem',
              marginBottom: '1.5rem',
              fontWeight: '700',
            },
            h3: {
              fontFamily: theme('fontFamily.raleway').join(', '),
              fontSize: '1.5rem',
              marginTop: '2rem',
              marginBottom: '1rem',
              fontWeight: '600',
            },
            p: {
              fontFamily: theme('fontFamily.raleway').join(', '),
              marginBottom: '1.5rem',
              lineHeight: '1.75',
            },
            a: {
              color: theme('colors.fountain-blue'),
              textDecoration: 'none',
              transition: 'color 0.2s',
              '&:hover': {
                color: theme('colors.blumine.DEFAULT'),
              },
            },
            code: {
              fontFamily: theme('fontFamily.space').join(', '),
              backgroundColor: `${theme('colors.powder-blue')}20`,
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              fontFamily: theme('fontFamily.space').join(', '),
              backgroundColor: theme('colors.blumine.dark'),
              padding: '1.5rem',
              borderRadius: '0.5rem',
              overflow: 'auto',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              fontSize: '0.875em',
              color: theme('colors.powder-blue'),
            },
            img: {
              borderRadius: '0.75rem',
              boxShadow: theme('boxShadow.lg'),
            },
          },
        },
      }),
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
    },
  },
  plugins: [
    typography,
  ],
}
