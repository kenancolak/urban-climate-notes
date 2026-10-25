import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  // Exact host used by the local review environment; production is unaffected.
  server: { allowedHosts: ['terminal.local'] },
  build: {
    manifest: true,
  },
});
