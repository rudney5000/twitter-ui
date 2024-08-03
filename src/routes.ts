import {createRouter, createWebHistory} from "vue-router";
import routes from "./modules/routes.ts";

export const router = createRouter({
    history: createWebHistory(),
    routes
})