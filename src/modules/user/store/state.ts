import {ProfileDetails, ProfileStatus} from "../types.ts";

export type State = {
    status?: ProfileStatus
    profileDetails: ProfileDetails
    // profileTweets: Tweet[]
}

export const state: State ={
    profileDetails: {
        id: 0,
        nickname: '',
        imageLink: ''
    }
}
