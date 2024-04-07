import { defineConfig } from '@solidjs/start/config';

export default defineConfig({
  server: {
    preset: 'cloudflare-pages',
  },
  vite: {
    assetsInclude: ['**/*.glb'],
  },
});
