import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path para GitHub Pages
  // Cuando se deploya en https://getafeelectronic.github.io/miserviciotecnico/
  base: '/miserviciotecnico/',
  build: {
    // Optimizaciones para producción
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          maps: ['@react-google-maps/api'],
          animations: ['framer-motion'],
        }
      }
    }
  }
})
