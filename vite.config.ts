import { fileURLToPath, URL } from 'node:url'
import VueRouter from 'unplugin-vue-router/vite';
import AutoImport from 'unplugin-auto-import/vite';

import { defineConfig } from 'vite'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.vue\.[tj]sx?\?vue/, // .vue (vue-loader with experimentalInlineMatchResource enabled)
        /\.md$/, // .md
      ],
      imports: [
        // presets
        'vue',
        'vue-router',],
      dts: true,
      viteOptimizeDeps: true
    }),
    VueRouter(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: element => element.startsWith('iconify-icon')
        }
      }
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
