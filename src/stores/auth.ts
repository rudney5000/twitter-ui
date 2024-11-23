import {ref} from "vue";
import {defineStore} from "pinia";
import {User} from "../types/user.ts";
import Http from "../http/axios.ts";


export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const isAuthenticated = ref(false)

    const login = async (username: string, password: string) => {
        try {
            const response = await Http.post(`/auth/access_token`, { username, password });
            const { idToken, user: userData } = response.data;

            localStorage.setItem("token", idToken);

            if (userData) {
                localStorage.setItem("user", JSON.stringify(userData));
            }

            user.value = userData || null;
            isAuthenticated.value = true;

        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    }

    const register = async (username: string, password: string) => {
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

    const restoreSession = () => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (token) {
            isAuthenticated.value = true;

            try {
                user.value = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
            } catch (error) {
                console.error("Error parsing stored user:", error);
                user.value = null;
                localStorage.removeItem("user");
            }
        } else {
            logout();
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        user.value = null;
        isAuthenticated.value = false;
    }

    return {
        user,
        isAuthenticated,
        login,
        register,
        logout,
        restoreSession
    }
})