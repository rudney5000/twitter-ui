import {UserData} from "../types.ts";

export type AuthStatus = {
    statusCode?: number
    message?: string
    isLoggedIn: boolean
}

export type State = {
    accessToken: string
    authStatus: AuthStatus
    user: UserData
}

export const state: State = {
    authStatus: {
        isLoggedIn: false,
    },
    accessToken: '',
    user: {
        id: 0,
        username: '',
        password: '',
    },
}