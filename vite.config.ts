import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      react: resolve(__dirname, 'node_modules/react'),
      'react-dom': resolve(__dirname, 'node_modules/react-dom'),
      'framer-motion': resolve(__dirname, 'node_modules/framer-motion'),
      'lucide-react': resolve(__dirname, 'node_modules/lucide-react'),
    },
  },
  plugins: [
    tailwindcss(),
    react(),
  ],
})
