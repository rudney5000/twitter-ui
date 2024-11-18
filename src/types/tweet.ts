export interface Tweet {
    id: string
    message: string
}

export interface CreateTweetData {
    message: string
}

export interface UpdateTweetData {
    message: string
}

export interface TweetResponse {
    tweet: Tweet
    message: string
}