import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import {store} from "./store.ts";
import {router} from "./routes.ts";

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
