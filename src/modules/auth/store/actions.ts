import {AugmentedActionContext} from "../../../store.ts";
import {Mutations, MutationTypes} from "./mutations.ts";
import {State} from "./state.ts";
import {ActionTree} from "vuex";
import axios from "../../../http/axios.ts";

export enum ActionTypes {
  AUTHENTICATE_USER = 'AUTHENTICATE_USER',
  REFRESH_AUTH_TOKEN = 'REFRESH_AUTH_TOKEN',
  GET_USER_DATA = 'GET_USER_DATA',
  LOGOUT_USER = 'LOGOUT_USER',
}

export type Actions = {
  [ActionTypes.AUTHENTICATE_USER](
    { commit }: AugmentedActionContext<Mutations, State>,
    payload: { email: string; password: string }
  ): Promise<void>
  [ActionTypes.GET_USER_DATA]({
    commit,
  }: AugmentedActionContext<Mutations, State>): Promise<void>
}

export const actions: ActionTree<State, State> & Actions = {
    async [ActionTypes.AUTHENTICATE_USER]({ commit }, payload): Promise<void> {
        try{
            const response = await axios.post<{ access_token: string }>(
            '/authentication/access_token',
            {
              email: payload.email,
              password: payload.password,
            }
      )
            axios.default.headers.common[
                'Authorization'
                ] = `Bearer ${response.data.access_token}`
            commit(MutationTypes.SET_ACCESS_TOKEN, response.data.access_token)
            commit(MutationTypes.SET_AUTHENTICATION_STATUS,{
                message: 'Successfully logged in',
                statusCode: response.status,
                isLoggedIn: true,
            })
        } catch (error){
            commit(MutationTypes.SET_AUTHENTICATION_STATUS, {
            message: error.response.data.message,
            statusCode: error.response.status || 401,
            isLoggedIn: false,
          })
        }
    },

    // async [ActionTypes.GET_USER_DATA]({
    //     commit
    // }: AugmentedActionContext<Mutations, State>): Promise<void>{
    //     try {
    //
    //     }catch (error){
    //         commit(MutationTypes.SET_AUTHENTICATION_STATUS, {
    //         message: error.response.data.message,
    //         statusCode: error.response.status || 401,
    //         isLoggedIn: false,
    //   })
    // }
    //     }
    // }
}