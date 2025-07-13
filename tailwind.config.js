/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0F0F23',
        'secondary': '#1A1A2E',
        'accent': '#E94560',
        'background': '#16213E',
        'foreground': '#FFFFFF',
        'muted': '#6B7280',
        'muted-foreground': '#9CA3AF',
        'border': '#374151',
        'input': '#374151',
        'ring': '#E94560',
      },
      fontFamily: {
        'jetbrains': ['JetBrains Mono', 'monospace'],
        'inter': ['Inter', 'sans-serif'],
        'space': ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'float-fast': 'float-fast 4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'morphing': 'morphing 3s ease-in-out infinite',
        'wave': 'wave 4s ease-in-out infinite',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-30px) rotate(180deg)' }
        },
        'float-fast': {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-15px) scale(1.1)' }
        },
        'pulse-glow': {
          'from': { boxShadow: '0 0 20px rgba(233, 69, 96, 0.3)' },
          'to': { boxShadow: '0 0 30px rgba(233, 69, 96, 0.6)' }
        },
        'morphing': {
          '0%, 100%': { borderRadius: '50%' },
          '50%': { borderRadius: '20%' }
        },
        'wave': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      }
    },
  },
  plugins: [],
}