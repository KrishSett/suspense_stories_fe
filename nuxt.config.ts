// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-05-15',
	devtools: { enabled: true },
	modules: ['@nuxt/ui', '@pinia/nuxt'],
	components: [
		{
			path: '~/components',
			pathPrefix: false,
		},
	],
	css: ['~/assets/css/main.css'],
	runtimeConfig: {
		// Public keys exposed to client
		public: {
			apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL
		},
		// Private keys only available server-side
		apiSecretKey: process.env.API_SECRET_KEY,
	}
});