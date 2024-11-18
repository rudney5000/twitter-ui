import {ref} from "vue";
import {defineStore} from "pinia";
import {User} from "../types/user.ts";
import Http from "../http/axios.ts";


export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const isAuthenticated = ref(false)

    const login = async (username: string, password: string) => {
        // TODO: Implement actual login logic with API
        try {
            const response = await Http.post(`/auth/access_token`, { username, password });
            const { token, user: userData } = response.data;

            localStorage.setItem("token", token);

            user.value = userData;
            isAuthenticated.value = true;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    }

    const register = async (username: string, password: string) => {
        // TODO: Implement actual registration logic with API

        try {
            const response = await Http.post(`/accounts/register`, {
                username,
                password,
            });
            const token = response.data.token;
            localStorage.setItem("token", token);

            user.value = {
                id: "",
                username,
                password: "",
            };
            isAuthenticated.value = true;
        } catch (error) {
            console.error("Registration failed:", error);
            throw error;
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        user.value = null;
        isAuthenticated.value = false;
    }

    return {
        user,
        isAuthenticated,
        login,
        register,
        logout
    }
})