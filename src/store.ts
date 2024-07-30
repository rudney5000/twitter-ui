import {createStore, ModuleTree, Store} from "vuex";

const modules: ModuleTree<any> = {}

export const store = createStore({
    modules
})

export function useStore() {
    return useVuexStore as Store
}