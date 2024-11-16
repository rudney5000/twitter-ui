export interface Tweet {
    id: string
    content: string
    author: {
        id: string
        name: string
        handle: string
    }
    likes: number
    retweets: number
    comments: number
    timestamp: string
    isLiked?: boolean
    isRetweeted?: boolean
}

export interface CreateTweetData {
    content: string
}

export interface UpdateTweetData {
    content: string
}

export interface TweetResponse {
    tweet: Tweet
    message: string
}