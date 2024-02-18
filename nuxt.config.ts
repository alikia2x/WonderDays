// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['nuxt-icon', '@nuxtjs/i18n', 'nuxt-icons', '@nuxt/ui', '@kevinmarrec/nuxt-pwa'],
  i18n: {
    vueI18n: '~/i18n/i18n.config.ts',
  },
  pwa: {
    workbox: {
      enabled: false, // 开发模式也启动
    }
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  ssr: false
})
