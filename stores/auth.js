import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { STORE_KEYS } from '~/keys/store-keys'

export const useAuthStore = defineStore(STORE_KEYS.AUTH, () => {
    // State
    const isAuthenticated = ref(false)
    const username = ref(null)

    // Actions
    const login = (name) => {        
        isAuthenticated.value = true
        username.value = name
    }

    const logout = () => {
        isAuthenticated.value = false
        username.value = null
    }

    // Getters
    const isLoggedIn = computed(() => isAuthenticated.value)
    const currentUser = computed(() => username.value)

    return {
        // State
        isAuthenticated,
        username,

        // Actions
        login,
        logout,

        // Getters
        isLoggedIn,
        currentUser
    }
});