import { defineConfig } from 'vitest/config';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      all: true,
      include: ['**/src/**'],
      exclude: [
        ...configDefaults.exclude,
        '**/.next/**',
        '*.config.js'
      ],
    },
  },
})