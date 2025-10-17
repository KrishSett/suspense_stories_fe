export default defineNuxtRouteMiddleware((to) => {
    const auth = useAuthStore();
    // auth.login('krish');

    // Redirect to login page
    if (!auth.isAuthenticated) {
        return navigateTo('/auth/login')
    }
});