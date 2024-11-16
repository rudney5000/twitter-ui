import {ref} from "vue";
import {defineStore} from "pinia";
import {User} from "../types/user.ts";


export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const isAuthenticated = ref(false)

    const login = async (email: string, password: string) => {
        // TODO: Implement actual login logic with API
        // This is just a mock implementation
        user.value = {
            id: '1',
            name: 'Test User',
            email
        }
        isAuthenticated.value = true
    }

    const register = async (name: string, email: string, password: string) => {
        // TODO: Implement actual registration logic with API
        // This is just a mock implementation
        user.value = {
            id: '1',
            name,
            email
        }
        isAuthenticated.value = true
    }

    const logout = () => {
        user.value = null
        isAuthenticated.value = false
    }

    return {
        user,
        isAuthenticated,
        login,
        register,
        logout
    }
})