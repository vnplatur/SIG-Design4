/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#0F172A',
          800: '#1E293B',
          50: '#F8FAFC',
        },
        secondary: {
          600: '#475569',
          500: '#64748B',
        },
        accent: {
          600: '#0F766E',
          500: '#14B8A6',
          300: '#5EEAD4',
        },
        text: {
          primary: '#020617',
          secondary: '#475569',
          tertiary: '#64748B',
        },
        border: {
          light: '#E2E8F0',
          muted: '#F1F5F9',
        },
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'Open Sans', 'sans-serif'],
        serif: ['IBM Plex Serif', 'serif'],
      },
      maxWidth: {
        container: '1280px',
        'container-lg': '1440px',
      },
      borderRadius: {
        default: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
      },
      transitionDuration: {
        fast: '150ms',
        default: '300ms',
        slow: '500ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
