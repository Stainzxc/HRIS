import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      // Detect edits from Windows when the frontend runs in Docker.
      usePolling: true,
      interval: 300,
    },
  },
})
