import { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.ts'],
  theme: {
    extend: {
      colors: {
        // Dark ink ground; orange and aqua carry over from the original site (and echo the TUI's k9s skin).
        ink: '#0b0e14',
        panel: '#11161f',
        line: '#232b38',
        fg: '#d9dee7',
        dim: '#8b94a6',
        orange: '#ff9500',
        aqua: '#00e5c0',
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
