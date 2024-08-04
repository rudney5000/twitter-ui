import {Getters, getters} from "./getters.ts";
import {Mutations, mutations} from "./mutations.ts";
import {Actions, actions} from "./actions.ts";
import {State, state} from "./state.ts";
import {Module} from "vuex";
import {AugmentedModule} from "../../../store.ts";

export type ProfileModule<S = State> = AugmentedModule<
    S,
    Mutations,
    Getters,
    Actions
>

export const profileModule: Module<State, State> = {
    state,
    actions,
    mutations,
    getters,
}