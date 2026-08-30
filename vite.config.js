import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        // split heavy, rarely-changing vendors so they cache independently
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
          vendor: ['lenis', 'lucide-react'],
        },
      },
    },
  },
})
