import react from '@vitejs/plugin-react';
import * as path from 'node:path';
import macrosPlugin from 'vite-plugin-babel-macros';
import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr({ include: '**/*.svg?react' }), macrosPlugin()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/assets': path.resolve(__dirname, 'src', 'assets'),
      '@/components': path.resolve(__dirname, 'src', 'components'),
      '@/routes': path.resolve(__dirname, 'src', 'routes'),
      '@/stores': path.resolve(__dirname, 'src', 'store'),
      '@/utils': path.resolve(__dirname, 'src', 'utils'),
    },
  },
});
