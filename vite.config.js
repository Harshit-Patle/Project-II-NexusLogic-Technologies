import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()], // Ensure this plugin is included
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
