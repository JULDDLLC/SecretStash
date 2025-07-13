/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-move': {
          '0%': { 'background-position': '0% 50%' },
          '100%': { 'background-position': '100% 50%' },
        },
        'cosmic-drift': {
          '0%, 100%': { 
            transform: 'translate(0, 0) rotate(0deg)',
            opacity: '0.3'
          },
          '25%': { 
            transform: 'translate(-20px, -30px) rotate(1deg)',
            opacity: '0.5'
          },
          '50%': { 
            transform: 'translate(20px, -20px) rotate(-1deg)',
            opacity: '0.4'
          },
          '75%': { 
            transform: 'translate(-10px, 20px) rotate(0.5deg)',
            opacity: '0.6'
          }
        },
        'cosmic-drift-reverse': {
          '0%, 100%': { 
            transform: 'translate(0, 0) rotate(0deg)',
            opacity: '0.2'
          },
          '33%': { 
            transform: 'translate(30px, 20px) rotate(-1deg)',
            opacity: '0.4'
          },
          '66%': { 
            transform: 'translate(-20px, 30px) rotate(1deg)',
            opacity: '0.3'
          }
        },
        'float': {
          '0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.3' },
          '90%': { opacity: '0.3' },
          '100%': { transform: 'translateY(-100px) rotate(360deg)', opacity: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'gradient-x': 'gradient-x 3s ease-in-out infinite',
        'cosmic-drift': 'cosmic-drift 20s ease-in-out infinite',
        'cosmic-drift-reverse': 'cosmic-drift-reverse 25s ease-in-out infinite',
        'float': 'float 15s infinite linear',
      },
      fontFamily: {
        'manrope': ['var(--font-manrope)', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};