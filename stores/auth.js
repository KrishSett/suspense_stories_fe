import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { STORE_KEYS } from '~/keys/store-keys'

export const useAuthStore = defineStore(STORE_KEYS.AUTH, () => {
    // Use cookie for persistence
    const authCookie = useCookie('auth_state', {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: 'lax'
    })

    // Initialize from cookie
    const isAuthenticated = ref(authCookie.value?.isAuthenticated || false)
    const userId = ref(authCookie.value?.userId || null)

    // Sync to cookie helper
    const syncToCookie = () => {
        authCookie.value = {
            isAuthenticated: isAuthenticated.value,
            userId: userId.value
        }
    }

    // Actions
    const login = (Id) => {        
        isAuthenticated.value = true
        userId.value = Id
        syncToCookie()
    }

    const logout = () => {
        isAuthenticated.value = false
        userId.value = null
        authCookie.value = null // Clear cookie
    }

    // Getters
    const isLoggedIn = computed(() => isAuthenticated.value)
    const currentUser = computed(() => userId.value)

    return {
        isAuthenticated,
        userId,
        login,
        logout,
        isLoggedIn,
        currentUser
    }
})