export interface TweetAddRequest {
    message: string;
}

export interface TweetResponse {
    id: number;
    message: string;
    createdTimestamp: string;
    modifiedTimestamp: string;
}

export interface TweetPageResponse {
    totalTweets: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    tweets: TweetResponse[];
}

export interface TweetFindRequest {
    page: number;
    limit: number;
}

export interface TweetEditRequest {
    id: number;
    message: string;
}

