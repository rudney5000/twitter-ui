import authRoutes from "./auth/routes.ts";
import {RouteRecordRaw} from "vue-router";
import Root from "./root/index.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: Root
    },
    ...authRoutes,
]

export default routes