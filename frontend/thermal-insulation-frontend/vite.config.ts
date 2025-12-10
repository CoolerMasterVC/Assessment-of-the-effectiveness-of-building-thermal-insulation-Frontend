// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
// vite.config.ts
VitePWA({
  registerType: 'autoUpdate',
  manifest: {
    name: 'Теплоизоляционные материалы',
    short_name: 'Теплоизоляция', 
    start_url: '/Assessment-of-the-effectiveness-of-building-thermal-insulation-Frontend/',
    display: 'standalone',
    theme_color: '#ffc107',
    background_color: '#ffffff'
    // БЕЗ icons!
  }
})
  ],
  base: '/Assessment-of-the-effectiveness-of-building-thermal-insulation-Frontend/',
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})