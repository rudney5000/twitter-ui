import {RouteRecordRaw} from "vue-router";
import Root from "./root/index.vue";
import authRoutes from "./auth/routes.ts";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: Root
    },
    ...authRoutes,
]

export default routes