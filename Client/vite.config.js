import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    proxy: {
      // Any request starting with /api will be forwarded
      '/api': {
        target: 'http://localhost:3000', // Your Node.js server address
        changeOrigin: true,
        secure: false,
      },
    },
  },
})