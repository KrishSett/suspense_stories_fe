export default defineNuxtRouteMiddleware((to) => {
    const auth = useAuthStore();
    auth.login('krish');

    // Redirect to error page if not authenticated
    if (!auth.isAuthenticated) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Access Prohibited',
            data: {
                redirect: '/error',
                message: 'API access denied'
            }
        });
    }
});