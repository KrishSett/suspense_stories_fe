export default defineNuxtRouteMiddleware((to) => {
    console.log("=== MIDDLEWARE RUNNING ===");
    console.log("To path:", to.path);
    
    const auth = useAuthStore();
    console.log("Auth store:", auth);
    console.log("Is Authenticated:", auth.isAuthenticated);

    if (!auth.isAuthenticated) {
        console.log("NOT AUTHENTICATED - Redirecting to login");
        return navigateTo('/auth/login');
    }
    
    console.log("AUTHENTICATED - Allowing access");
})