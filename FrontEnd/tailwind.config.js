/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8f5e9',
          100: '#c8e6c9',
          200: '#a5d6a7',
          300: '#81c784',
          400: '#66bb6a',
          500: '#4caf50',
          600: '#43a047',
          700: '#388e3c',
          800: '#2e7d32',
          900: '#1b5e20',
          950: '#0d3010',
        },
        secondary: {
          50: '#efebe9',
          100: '#d7ccc8',
          200: '#bcaaa4',
          300: '#a1887f',
          400: '#8d6e63',
          500: '#795548',
          600: '#6d4c41',
          700: '#5d4037',
          800: '#4e342e',
          900: '#3e2723',
          950: '#2d1b18',
        },
        accent: {
          50: '#e1f5fe',
          100: '#b3e5fc',
          200: '#81d4fa',
          300: '#4fc3f7',
          400: '#29b6f6',
          500: '#03a9f4',
          600: '#039be5',
          700: '#0288d1',
          800: '#0277bd',
          900: '#01579b',
          950: '#013b68',
        },
        highlight: {
          50: '#fbe9e7',
          100: '#ffccbc',
          200: '#ffab91',
          300: '#ff8a65',
          400: '#ff7043',
          500: '#ff5722',
          600: '#f4511e',
          700: '#e64a19',
          800: '#d84315',
          900: '#bf360c',
          950: '#8c2800',
        },
        success: {
          50: '#e8f5e9',
          100: '#c8e6c9',
          200: '#a5d6a7',
          300: '#81c784',
          400: '#66bb6a',
          500: '#4caf50',
          600: '#43a047',
          700: '#388e3c',
          800: '#2e7d32',
          900: '#1b5e20',
          950: '#0d3010',
        },
        warning: {
          50: '#fffde7',
          100: '#fff9c4',
          200: '#fff59d',
          300: '#fff176',
          400: '#ffee58',
          500: '#ffeb3b',
          600: '#fdd835',
          700: '#fbc02d',
          800: '#f9a825',
          900: '#f57f17',
          950: '#b35900',
        },
        error: {
          50: '#ffebee',
          100: '#ffcdd2',
          200: '#ef9a9a',
          300: '#e57373',
          400: '#ef5350',
          500: '#f44336',
          600: '#e53935',
          700: '#d32f2f',
          800: '#c62828',
          900: '#b71c1c',
          950: '#7f1d1d',
        },
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'forest-pattern': "url('https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')",
        'leaf-pattern': "url('https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')",
      },
    },
  },
  plugins: [],
};