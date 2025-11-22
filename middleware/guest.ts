export default defineNuxtRouteMiddleware((to, from) => {
  console.log("=== GUEST MIDDLEWARE RUNNING ===");
  console.log("To path:", to.path);
  
  const auth = useAuthStore();
  console.log("Is Authenticated:", auth.isAuthenticated);
  
  // Define guest-only routes (routes that authenticated users shouldn't access)
  const guestOnlyRoutes = ['/auth/login', '/auth/signup', '/auth/forgot-password', '/auth/reset-password'];
  
  // Check if current route is a guest-only route
  const isGuestRoute = guestOnlyRoutes.includes(to.path);
  
  // Redirect authenticated users away from guest-only pages
  if (auth.isAuthenticated && isGuestRoute) {
    console.log("AUTHENTICATED USER - Redirecting from guest page to home");
    return navigateTo('/home');
  }
});