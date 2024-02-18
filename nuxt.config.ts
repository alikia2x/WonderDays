export default defineNuxtConfig({
    devtools: {
        enabled: true,

        timeline: {
            enabled: true,
        },
    },
    css: ["~/assets/css/main.css"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    modules: ["nuxt-icon", "@nuxtjs/i18n", "nuxt-icons", "@nuxt/ui", "@vite-pwa/nuxt"],
    i18n: {
        vueI18n: "~/i18n/i18n.config.ts",
    },
    pwa: {
        injectRegister: 'auto',
        strategies: "generateSW",
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}','/']
        },
        includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
        manifest: {
          name: "WonderDays",
          short_name: "WonderDays",
          description: "WonderDays: Your personal event countdown. Cherish moments with a simple, elegant countdown timer for life's significant milestones. Start anticipating your special days now!",
          theme_color: '#ffffff',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any'
            },
            { 
              src: "/maskable-icon.png", 
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable" 
            }
          ]
        }
    },
    app: {
        head: {
            charset: "utf-8",
            viewport: "width=device-width, initial-scale=1",
        },
    },
    ssr: false,
});
