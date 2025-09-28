import path from 'path'
import { defineConfig } from 'vitest/config'


export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    environment: 'jsdom',
    exclude: [
      '.next/**',
      './node_modules/**',
    ],
    globals: true,
    setupFiles: './src/tests/setup.ts',
    alias: {
      'contracts': path.resolve(__dirname, './src/contracts'),
    },
  },
})
