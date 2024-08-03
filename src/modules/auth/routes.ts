import {RouteRecordRaw} from "vue-router";
import Login from "./login.vue";

const authRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        component: Login
    },
]

export default authRoutes