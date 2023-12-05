import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    base: './',
    outDir: 'dist',
    rollupOptions: {
      input: 'src/main.jsx',
      external: [
        'react',
        'react-dom',
        'dompurify',
        'marked',
        'react/jsx-runtime',
        '@picocss/pico/css/pico.min.css'
      ],
    },
  },
  server: {
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://localhost:3333/',
        changeOrigin: true,
      }
    }
  }
})