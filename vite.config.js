import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { viteSingleFile } from "vite-plugin-singlefile"

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    port: 3122,
    strictPort: false,
  },
  preview: {
    host: "0.0.0.0",
    port: '4210'
  },
  plugins: [
    vue(),
    UnoCSS(),
    viteSingleFile()
  ],
})
