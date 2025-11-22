// nuxt.config.ts
export default defineNuxtConfig({
	compatibilityDate: '2025-05-15',
	devtools: { enabled: true },
	modules: ['@nuxt/ui', '@pinia/nuxt'],
	components: [
		{
			path: '~/components',
			pathPrefix: true, // Changed to true
		},
	],
	css: [
		'~/assets/css/auth.css',
		'~/assets/css/main.css'
	],
	runtimeConfig: {
		public: {
			apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
			appTitle: process.env.NUXT_PUBLIC_APP_TITLE,
			appSubtitle: process.env.NUXT_PUBLIC_APP_SUBTITLE
		},
		apiSecretKey: process.env.API_SECRET_KEY,
	}
});