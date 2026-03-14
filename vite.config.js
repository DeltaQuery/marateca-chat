import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { resolve } from 'path'
import { copyFileSync } from 'fs'

export default defineConfig({
  plugins: [
    preact(),
    // Copia public/index.html a dist/index.html después del build
    {
      name: 'copy-index-html',
      closeBundle() {
        copyFileSync(
          resolve(__dirname, 'public/index.html'),
          resolve(__dirname, 'dist/index.html')
        )
      }
    }
  ],
  build: {
    lib: {
      entry:    resolve(__dirname, 'src/index.jsx'),
      name:     'MaratecaChat',
      fileName: 'marateca-chat',
      formats:  ['iife'],
    },
    rollupOptions: {
      output: {
        assetFileNames: 'marateca-chat.css',
      }
    }
  },
  publicDir: 'public'
})