import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/urban-climate-notes/',
  plugins: [react()],
  build: {
    manifest: true,
  },
});
