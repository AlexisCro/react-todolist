/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
      environment: 'jsdom',
      testTimeout: 10000,
  },
  base: '/react-todolist/',
})
