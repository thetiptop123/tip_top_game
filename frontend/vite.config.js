import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Make sure this is present to simulate the browser environment
    globals: true,
    setupFiles: './src/setupTests.js', // Optional: if you have setup files for your tests
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'), // If you use absolute imports
    },
  },
});
