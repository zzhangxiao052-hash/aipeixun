/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Roboto', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        // Override 'blue' with our Professional Enterprise Blue Palette so existing code updates automatically
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', 
          600: '#2563eb', // Vibrant Brand Blue (Primary)
          700: '#1d4ed8', // Hover State
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        // Also define 'primary' as an alias for semantic usage
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', 
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        // Refined grays
        gray: {
          50: '#f8f9fa', // Ultra light background
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#6c757d', // Secondary text
          700: '#495057',
          800: '#343a40', // Primary text
          900: '#212529',
        },
      },
      borderRadius: {
        // Standardizing radius
        DEFAULT: '0.5rem', // 8px
        'md': '0.375rem', // 6px
        'lg': '0.5rem',   // 8px
        'xl': '0.75rem',  // 12px
        '2xl': '1rem',    // 16px
      },
      boxShadow: {
        // Soft, diffused shadows
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
        'soft': '0 8px 30px rgba(0, 0, 0, 0.04)', // Custom ultra-soft shadow
        'card': '0 2px 8px rgba(0, 0, 0, 0.04), 0 0 1px rgba(0,0,0,0.1)', // Subtle card border/shadow
      },
    },
  },
  plugins: [],
};
