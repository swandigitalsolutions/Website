import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Home page + one HTML entry per generated service page (scripts/generate-pages.mjs).
const servicesDir = path.resolve(__dirname, 'services')
const serviceInputs = fs.existsSync(servicesDir)
  ? Object.fromEntries(
      fs.readdirSync(servicesDir).map((slug) => [`service-${slug}`, path.join(servicesDir, slug, 'index.html')]),
    )
  : {}

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: isSsrBuild
    ? { target: 'node18', reportCompressedSize: false }
    : {
        target: 'es2020',
        cssCodeSplit: true,
        reportCompressedSize: false,
        rollupOptions: {
          input: { main: path.resolve(__dirname, 'index.html'), ...serviceInputs },
          output: {
            // split heavy, rarely-changing vendors so they cache independently
            manualChunks: {
              react: ['react', 'react-dom'],
              motion: ['motion/react'],
              vendor: ['lucide-react'],
            },
          },
        },
      },
}))
