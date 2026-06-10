import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@repo/common': path.resolve(__dirname, '../../packages/common/src/index.ts'),
      '@repo/ui': path.resolve(__dirname, '../../packages/ui/src/index.tsx'),
    },
  },
  server: {
    port: 4000,
  },
})
