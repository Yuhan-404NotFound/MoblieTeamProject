import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa"

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']  // 오프라인 캐싱 파일일
      },

      includeAssets: ['apple-touch-icon.png'],
      manifest: {
        name: '작심삼일',
        short_name: '3days',
        description: '습관의 시작을 위한 일정관리 웹앱 입니다.',
        theme_color: '#000000',
        icons: [
          {
            src: '/logo.png', // public 폴더에 logo.png 파일 넣기
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/logo.png', 
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
    })
  ],
})