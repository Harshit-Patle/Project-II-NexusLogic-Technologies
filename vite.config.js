import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Ensure this is correctly imported
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Resolves '@' to the 'src' directory
    }
  }
});