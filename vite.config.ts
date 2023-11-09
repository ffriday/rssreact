/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
    },
  },
  plugins: [react()],
});
