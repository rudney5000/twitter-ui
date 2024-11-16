import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../api/axios'
import type { Tweet, CreateTweetData, UpdateTweetData, TweetResponse } from '../types/tweet'

export const useTweetStore = defineStore('tweet', () => {
    const tweets = ref<Tweet[]>([])
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    // Get all tweets
    const fetchTweets = async () => {
        isLoading.value = true
        error.value = null
        try {
            const response = await api.get<Tweet[]>('/tweets')
            tweets.value = response.data
        } catch (err) {
            error.value = 'Failed to fetch tweets'
            console.error('Error fetching tweets:', err)
        } finally {
            isLoading.value = false
        }
    }

    // Get tweets by user ID
    const fetchUserTweets = async (userId: string) => {
        isLoading.value = true
        error.value = null
        try {
            const response = await api.get<Tweet[]>(`/users/${userId}/tweets`)
            tweets.value = response.data
        } catch (err) {
            error.value = 'Failed to fetch user tweets'
            console.error('Error fetching user tweets:', err)
        } finally {
            isLoading.value = false
        }
    }

    // Create a new tweet
    const createTweet = async (data: CreateTweetData) => {
        isLoading.value = true
        error.value = null
        try {
            const response = await api.post<TweetResponse>('/tweets', data)
            tweets.value.unshift(response.data.tweet)
            return response.data
        } catch (err) {
            error.value = 'Failed to create tweet'
            console.error('Error creating tweet:', err)
            throw err
        } finally {
            isLoading.value = false
        }
    }

    // Update a tweet
    const updateTweet = async (tweetId: string, data: UpdateTweetData) => {
        isLoading.value = true
        error.value = null
        try {
            const response = await api.put<TweetResponse>(`/tweets/${tweetId}`, data)
            const index = tweets.value.findIndex(t => t.id === tweetId)
            if (index !== -1) {
                tweets.value[index] = response.data.tweet
            }
            return response.data
        } catch (err) {
            error.value = 'Failed to update tweet'
            console.error('Error updating tweet:', err)
            throw err
        } finally {
            isLoading.value = false
        }
    }

    // Delete a tweet
    const deleteTweet = async (tweetId: string) => {
        isLoading.value = true
        error.value = null
        try {
            await api.delete(`/tweets/${tweetId}`)
            tweets.value = tweets.value.filter(t => t.id !== tweetId)
        } catch (err) {
            error.value = 'Failed to delete tweet'
            console.error('Error deleting tweet:', err)
            throw err
        } finally {
            isLoading.value = false
        }
    }

    // Like a tweet
    const likeTweet = async (tweetId: string) => {
        try {
            const response = await api.post<TweetResponse>(`/tweets/${tweetId}/like`)
            const index = tweets.value.findIndex(t => t.id === tweetId)
            if (index !== -1) {
                tweets.value[index] = response.data.tweet
            }
            return response.data
        } catch (err) {
            console.error('Error liking tweet:', err)
            throw err
        }
    }

    // Retweet
    const retweet = async (tweetId: string) => {
        try {
            const response = await api.post<TweetResponse>(`/tweets/${tweetId}/retweet`)
            const index = tweets.value.findIndex(t => t.id === tweetId)
            if (index !== -1) {
                tweets.value[index] = response.data.tweet
            }
            return response.data
        } catch (err) {
            console.error('Error retweeting:', err)
            throw err
        }
    }

    return {
        tweets,
        isLoading,
        error,
        fetchTweets,
        fetchUserTweets,
        createTweet,
        updateTweet,
        deleteTweet,
        likeTweet,
        retweet
    }
})