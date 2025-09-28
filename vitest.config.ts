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
      'helpers': path.resolve(__dirname, './src/helpers'),
      'modules': path.resolve(__dirname, './src/modules'),
      'components': path.resolve(__dirname, './src/components'),
    },
  },
})
