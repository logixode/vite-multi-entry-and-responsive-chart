import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');
const publicDir = resolve(__dirname, 'public');
const assets = resolve(__dirname, 'assets');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  root,
  resolve: {
    alias: {
      '@assets': assets
    }
  },
  publicDir,
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      // this multi entry setting seems like multipage app
      // but with this setting all javascript or typescript
      // in each project can be build
      input: {
        main: resolve(root, 'index.html'),
        chart: resolve(root, 'responsive-chart/index.html'),
        simple_page: resolve(root, 'simple-chart/index.html'),
      },
    },
  },
})
