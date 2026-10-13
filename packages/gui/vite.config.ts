import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  // Keeps Rust compiler output visible in the `tauri dev` terminal.
  clearScreen: false,
  server: {
    // Tauri's devUrl points at this exact port, so fail instead of picking another.
    port: 5173,
    strictPort: true,
  },
});
