/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./testConfig.ts'],
    coverage: {
      provider: 'v8',
      include: ['**/src/**'],
      exclude: [
        ...configDefaults.exclude,
        '**/.next/**',
        './src/components/tests/**',
        '*.config.js',
        '**/pages/_app.tsx',
        '**/components/error/ErrorBoundary.tsx'
      ],
      all: true,
    },
  },
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  root: ".",
});