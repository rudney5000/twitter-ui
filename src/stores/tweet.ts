import { defineStore } from 'pinia'
import type {
    TweetResponse,
    TweetAddRequest,
    TweetEditRequest, TweetPageResponse, TweetFindRequest
} from '../types/tweet'
import axios from "axios";
import {useAuthStore} from "./auth.ts";
import Http from "../http/axios.ts";

export const useTweetStore = defineStore('tweet', {
    state: () => ({
        tweets: [] as TweetResponse[],
        isLoading: false,
        error: null,
        totalTweets: 0,
        isFirstPage: false,
        isLastPage: false,
        page: 1,
        limit: 10,
    }),

    actions: {
        async addTweet( payload : TweetAddRequest): Promise<TweetResponse> {
            // const authStore = useAuthStore();
            // if (!authStore.isAuthenticated) {
            //     console.error('User is not authenticated');
            //     throw new Error('User is not authenticated');
            // }
            try {
                const response = await Http.post<TweetResponse>(`/tweets`,  payload )
                this.tweets.push(response.data)
                return response.data
            } catch (error) {
                console.error('Error adding tweet:', error)
                throw error
            }
        },

        async editTweet({ payload }: TweetEditRequest): Promise<TweetResponse> {
            const authStore = useAuthStore();
            if (!authStore.isAuthenticated) {
                console.error('User is not authenticated');
                throw new Error('User is not authenticated');
            }
            try {
                const response = await Http.put<TweetResponse>(`/tweets`, { payload })
                const index = this.tweets.findIndex(tweet => tweet.id === payload.id)
                if (index !== -1) {
                    this.tweets[index] = response.data
                }
                return response.data
            } catch (e) {
                console.error('Error adding tweet:', e)
                throw e
            }
        },

        async fetchTweets(page: number = this.page, limit: number = this.limit) {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await Http.get<TweetPageResponse>(`/tweets?page=${page}&limit=${limit}`);

                if (!response?.data?.tweets) {
                    throw new Error("Tweets data not found in response.");
                }

                const data: TweetPageResponse = response.data;

                this.tweets = data.tweets;
                this.totalTweets = data.totalTweets;
                this.isFirstPage = data.isFirstPage;
                this.isLastPage = data.isLastPage;
                this.page = page;

            } catch (error: any) {
                console.error("Error fetching tweets:", error);
                this.error = error.message || "An unexpected error occurred.";
            } finally {
                this.isLoading = false;
            }
        }

    }
})
