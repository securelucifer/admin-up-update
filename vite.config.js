import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Build configuration for production
  build: {
    outDir: 'build', // Output directory (nginx will serve from here)
    sourcemap: false, // Disable source maps in production for security
    minify: 'terser', // Minify code
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          mui: ['@mui/material', '@mui/icons-material'],
        }
      }
    }
  },

  // Development server configuration
  server: {
    host: true, // ✅ Already correct - allows network access
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  },

  // Preview server (for testing build locally)
  preview: {
    port: 4173,
    host: true
  }
})
