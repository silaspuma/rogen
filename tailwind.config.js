/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Terminal/Hacker monospace fonts
        mono: ['Fira Code', 'JetBrains Mono', 'Courier New', 'monospace'],
      },
      colors: {
        // Hacker/Terminal theme colors
        primary: '#00ff00',    // Neon green
        secondary: '#00ffff',  // Cyan
        accent: '#ff00ff',     // Magenta
        
        // Terminal backgrounds
        'terminal-bg': '#0d0d0d',    // Pure black
        'terminal-dark': '#111111',  // Dark gray
        'terminal-border': '#1a1a1a',// Slightly lighter for borders
        
        // Text colors
        'neon-green': '#00ff00',
        'neon-cyan': '#00ffff',
        'neon-magenta': '#ff00ff',
        'neon-white': '#e0e0e0',
        'terminal-text': '#00ff00',  // Default terminal green
        
        dark: '#0d0d0d',
        light: '#ffffff',
      },
      backgroundImage: {
        // Removed soft gradients - using solid colors instead
      },
      boxShadow: {
        // Neon glow effects
        'glow-green': '0 0 10px rgba(0, 255, 0, 0.5), 0 0 20px rgba(0, 255, 0, 0.3)',
        'glow-cyan': '0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)',
        'glow-magenta': '0 0 10px rgba(255, 0, 255, 0.5), 0 0 20px rgba(255, 0, 255, 0.3)',
        'glow-lg': '0 0 20px rgba(0, 255, 0, 0.4)',
      },
      borderColor: {
        // Terminal border colors (glow effect via CSS)
        'neon-green': '#00ff00',
        'neon-cyan': '#00ffff',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
        'blink': 'blink 1s step-start infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 255, 0, 0.5)', opacity: '1' },
          '50%': { boxShadow: '0 0 20px rgba(0, 255, 0, 0.8)', opacity: '0.9' },
        },
        blink: {
          '50%': { opacity: '0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
