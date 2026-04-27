import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// IMPORTANT: change `base` to match your GitHub Pages repo name.
// If your repo is named "Portfolio", base is '/Portfolio/'.
// If you're deploying to a custom domain or username.github.io root, use '/'.
export default defineConfig({
  plugins: [react()],
  base: '/Portfolio/',
});
