import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import tailwindcss from '@tailwindcss/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import { functionsScanner, copyFile } from "wpsjs/vite_plugins";

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    copyFile({ src: 'manifest.xml', dest: 'manifest.xml', }),
    copyFile({ src: 'ribbon.xml', dest: 'ribbon.xml', }),
    functionsScanner({
      inputJsPath: 'src/scripts/functions.js',
      outputJsonPath: 'functions.json',
      namespace: 'HelloEt',
    }),
    vue(),
    tailwindcss(),
    Components({
      resolvers: [
        PrimeVueResolver()
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0'
  }
})
