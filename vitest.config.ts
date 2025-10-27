import path from 'node:path'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    env: {
      VITE_GAIA_SERVER_URL: 'http://localhost:3000',
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: './test/setup-tests.ts',
  },
})
