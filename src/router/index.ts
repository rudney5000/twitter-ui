import {createRouter, createWebHistory} from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import AppLayout from "../components/AppLayout.vue";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import {useAuthStore} from "../stores/auth.ts";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: 'home',
                    component: Home
                },
                {
                    path: 'profile/:id',
                    component: Profile
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    const publicPages = ['/login', '/register']
    const authRequired = !publicPages.includes(to.path)

    if (authRequired && !authStore.isAuthenticated) {
        return next('/login')
    }

    if (!authRequired && authStore.isAuthenticated) {
        return next('/home')
    }

    next()
})

export default router