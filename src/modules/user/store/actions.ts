import {State} from "./state.ts";
import {Mutations, MutationTypes} from "./mutations.ts";
import {AugmentedActionContext} from "../../../store.ts";
import {ActionTree} from "vuex";

export enum ActionTypes {
    REGISTER_ACCOUNT = 'REGISTER_ACCOUNT',
    GET_PROFILE_DETAILS = 'GET_PROFILE_DETAILS',
    // GET_PROFILE_TWEETS = 'GET_PROFILE_TWEETS',
    // LOAD_MORE_PROFILE_TWEETS = 'LOAD_MORE_PROFILE_TWEETS',
    // UPDATE_PROFILE_DETAILS = 'UPDATE_PROFILE_DETAILS',
    // UPDATE_PROFILE_IMAGE = 'UPDATE_PROFILE_IMAGE',
    // FOLLOW_USER = 'FOLLOW_USER',
    // UNFOLLOW_USER = 'UNFOLLOW_USER',
}

export type Actions = {
    [ActionTypes.REGISTER_ACCOUNT](
        { commit }: AugmentedActionContext<Mutations, State>,
        payload: { handle: string; email: string; password: string }
    ): Promise<void>
    [ActionTypes.GET_PROFILE_DETAILS](
        { commit }: AugmentedActionContext<Mutations, State>,
        handle: string
    ): Promise<void>
}

export const actions: ActionTree<State, State> & Actions = {
    async [ActionTypes.REGISTER_ACCOUNT](
        { commit },
        { handle, email, password }
    ): Promise<void> {
        try {
            await registerAccount({ handle, email, password })
        } catch (error) {
            return error
        }
    },
    async [ActionTypes.GET_PROFILE_DETAILS]({ commit }, handle): Promise<void> {
        try {
            const profile = await fetchProfileDetails(handle)

            commit(MutationTypes.SET_PROFILE_DETAILS, profile)
        } catch (error) {
            commit(MutationTypes.SET_PROFILE_STATUS, {
                statusCode: error.response.status,
                message: error.response.data.message,
            })
        }
    },
}