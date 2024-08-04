import {GetterTree} from "vuex";
import {State} from "./state.ts";
import {ProfileDetails} from "../types.ts";

export type Getters = {
    profileInfo(state: State): ProfileDetails
    // profileTweets(state: State): Tweet[]
    // lastProfileTweet(state: State): Tweet
}

export const getters: GetterTree<State, State> & Getters = {
    profileInfo(state): ProfileDetails {
        return state.profileDetails
    },
    // profileTweets(state): Tweet[] {
    //     return state.profileTweets
    // },
    // lastProfileTweet(state): Tweet {
    //     return state.profileTweets[state.profileTweets.length - 1]
    // },
}