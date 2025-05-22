/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        iranYekan : 'iranYekan , sans-serif'
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      zIndex: {
        '100': '100',
      },
      colors: {
        background: {
          DEFAULT: "hsl(var(--background))",
          dark: "hsl(var(--dark-background))",
        },
        brand: {
          DEFAULT: "hsl(var(--brand))",
          foreground: "hsl(var(--brand-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          dark: "hsl(var(--dark-primary))",
          'dark-foreground': "hsl(var(--dark-primary-foreground))",
        },
        text: {
          DEFAULT: "hsl(var(--text))",
          foreground: "hsl(var(--text-foreground))",
          dark: "hsl(var(--dark-text))",
          'dark-foreground': "hsl(var(--dark-text-foreground))",
        },
      }
    },
  },
  plugins: [],
}

