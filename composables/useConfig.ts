export const useConfig = () => {
  const config = useRuntimeConfig()
  
  return {
    apiBaseUrl: config.public.apiBaseUrl,
    appTitle: config.public.appTitle,
    // ... other config values ... //
  }
}