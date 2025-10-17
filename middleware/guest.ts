export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore()
  
    // Redirect authenticated users to home page
  if (auth.isAuthenticated) {
    return navigateTo('/home')
  }
});