<script lang="ts">
import {defineComponent, h, resolveComponent} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "./store.ts";
import axios from "./http/axios.ts";
import {Action} from "./modules/storeActionTypes.ts";

export default defineComponent({
  setup(){
    const store = useStore()
    const router = useRouter()
    const RouterView = resolveComponent('router-view')

    const responseInterceptor = axios.interceptors.response.use(
        (res) => res,
        async (error) => {
          if (error.response.status === 401){
            axios.interceptors.response.eject(responseInterceptor)
            await store.dispatch(Action.AuthActionTypes.GET_USER_DATA)
            if (!store.getters['isLoggedIn']){
              router.push('/login')
              return Promise.reject(error)
            }
          }
        }
    )

    return() => h(RouterView)
  }
})

</script>

<template>

</template>

<style scoped>

</style>
