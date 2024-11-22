import { defineStore } from 'pinia'
import type {
    TweetResponse,
    TweetAddRequest,
    TweetEditRequest, TweetPageResponse, TweetFindRequest
} from '../types/tweet'
import axios from "axios";
import {useAuthStore} from "./auth.ts";
import {ref} from "vue";

export const useTweetStore = defineStore('tweet', () => {
    const tweets = ref<TweetResponse[]>([])
    const isLoading = ref(false)
    const error = ref<string | null>(null) // Message d'erreur
    const totalTweets = ref(0) // Nombre total de tweets
    const isFirstPage = ref(false) // Indicateur de la première page
    const isLastPage = ref(false)

    // const loadTweets = async (page: number, limit: number) => {
    //     const authStore = useAuthStore(); // Assurez-vous que vous récupérez le token d'authentification ici
    //     if (!authStore.isAuthenticated) {
    //         console.error('User is not authenticated');
    //         throw new Error('User is not authenticated');
    //     }
    //
    //     isLoading.value = true; // Indiquer que le chargement commence
    //     error.value = null; // Réinitialiser l'erreur
    //
    //     try {
    //         const findRequest: TweetFindRequest = { page, limit };
    //
    //         // Récupérer le token d'authentification depuis votre store (assurez-vous que vous l'avez dans le store)
    //         const token = authStore.authToken;
    //
    //         const response = await fetch(`/tweets?page=${page}&limit=${limit}`, {
    //             method: 'GET', // Utilisez GET ici car vous récupérez des tweets
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`, // Ajouter le token d'authentification
    //             },
    //         });
    //
    //         if (!response.ok) {
    //             throw new Error('Erreur lors du chargement des tweets');
    //         }
    //
    //         const data: TweetPageResponse = await response.json();
    //
    //         tweets.value = data.tweets; // Mettre à jour les tweets
    //         totalTweets.value = data.totalTweets; // Mettre à jour le total de tweets
    //         isFirstPage.value = data.isFirstPage; // Mettre à jour l'état de la première page
    //         isLastPage.value = data.isLastPage; // Mettre à jour l'état de la dernière page
    //     } catch (err) {
    //         error.value = err instanceof Error ? err.message : 'Erreur inconnue';
    //     } finally {
    //         isLoading.value = false; // Indiquer que le chargement est terminé
    //     }
    // };


    const loadTweets = async (page: number, limit: number) => {
        const authStore = useAuthStore() // Assurez-vous que le token est accessible ici
        if (!authStore.isAuthenticated || !authStore.token) {
            console.error('User is not authenticated')
            throw new Error('User is not authenticated')
        }

        isLoading.value = true
        error.value = null

        try {
            const response = await fetch(`/tweets?page=${page}&limit=${limit}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authStore.token}`, // Ajout du token dans le header
                },
            })

            if (!response.ok) {
                throw new Error('Erreur lors du chargement des tweets')
            }

            const data: TweetPageResponse = await response.json()
            tweets.value = data.tweets
            totalTweets.value = data.totalTweets
            isFirstPage.value = data.isFirstPage
            isLastPage.value = data.isLastPage
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Erreur inconnue'
        } finally {
            isLoading.value = false
        }
    }

    // const loadTweets = async (page: number, limit: number) => {
    //     const authStore = useAuthStore();
    //     if (!authStore.isAuthenticated) {
    //         console.error('User is not authenticated');
    //         throw new Error('User is not authenticated');
    //     }
    //     isLoading.value = true; // Indiquer que le chargement commence
    //     error.value = null; // Réinitialiser l'erreur
    //     try {
    //         // Construire l'URL avec les paramètres page et limit
    //         const url = `/tweets?page=${page}&limit=${limit}`;
    //
    //         const response = await fetch(url, {
    //             method: 'GET', // Utiliser la méthode GET ici
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //
    //         if (!response.ok) {
    //             throw new Error('Erreur lors du chargement des tweets');
    //         }
    //
    //         const data: TweetPageResponse = await response.json();
    //         tweets.value = data.tweets; // Mettre à jour les tweets
    //         totalTweets.value = data.totalTweets; // Mettre à jour le total de tweets
    //         isFirstPage.value = data.isFirstPage; // Mettre à jour l'état de la première page
    //         isLastPage.value = data.isLastPage; // Mettre à jour l'état de la dernière page
    //     } catch (err) {
    //         error.value = err instanceof Error ? err.message : 'Erreur inconnue';
    //     } finally {
    //         isLoading.value = false; // Indiquer que le chargement est terminé
    //     }
    // };

    const addTweet = async (newTweet: TweetAddRequest) => {
        const authStore = useAuthStore();
        if (!authStore.isAuthenticated) {
            console.error('User is not authenticated');
            throw new Error('User is not authenticated');
        }

        try {
            const token = authStore.authToken; // Récupérer le token

            const response = await fetch('http://localhost:8089/api/v1/tweets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Ajouter le token d'authentification
                },
                body: JSON.stringify({ message }), // Envoyer le tweet
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la création du tweet');
            }

            const data = await response.json();
            console.log('Tweet créé avec succès:', data);
        } catch (err) {
            console.error('Erreur lors de la création du tweet:', err);
        }
    }

    const deleteTweet = async (tweetId: number) => {
        const authStore = useAuthStore();
            if (!authStore.isAuthenticated) {
                console.error('User is not authenticated');
                throw new Error('User is not authenticated');
            }
        isLoading.value = true
        error.value = null
        try {
            const response = await fetch(`/tweets/${tweetId}`, {
                method: 'DELETE',
            })
            if (!response.ok) {
                throw new Error('Erreur lors de la suppression du tweet')
            }
            tweets.value = tweets.value.filter(tweet => tweet.id !== tweetId) // Supprimer le tweet de la liste
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Erreur inconnue'
        } finally {
            isLoading.value = false
        }
    }

    // Action pour modifier un tweet
    const editTweet = async (editedTweet: TweetEditRequest) => {
        isLoading.value = true
        error.value = null
        try {
            const response = await fetch('/tweets', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedTweet), // Modifier le tweet avec les nouvelles données
            })
            if (!response.ok) {
                throw new Error('Erreur lors de la modification du tweet')
            }
            const updatedTweet: TweetResponse = await response.json()
            const index = tweets.value.findIndex(tweet => tweet.id === updatedTweet.id)
            if (index !== -1) {
                tweets.value[index] = updatedTweet // Mettre à jour le tweet modifié dans la liste
            }
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Erreur inconnue'
        } finally {
            isLoading.value = false
        }
    }
    return {
        tweets,
        isLoading,
        error,
        totalTweets,
        isFirstPage,
        isLastPage,
        loadTweets,
        addTweet,
        deleteTweet,
        editTweet,
    }
})
// export const useTweetStore = defineStore('tweet', {
//     state: () => ({
//         tweets: [] as TweetResponse[],
//         isLoading: false,
//         error: null,
//         totalTweets: 0,
//         isFirstPage: false,
//         isLastPage: false,
//         page: 1,
//         limit: 10,
//     }),
//
//     actions: {
//         async addTweet({ payload }: TweetAddRequest): Promise<TweetResponse> {
//             const authStore = useAuthStore();
//             if (!authStore.isAuthenticated) {
//                 console.error('User is not authenticated');
//                 throw new Error('User is not authenticated');
//             }
//             try {
//                 const response = await axios.post<TweetResponse>(`/tweets`, { payload })
//                 this.tweets.push(response.data)
//                 return response.data
//             } catch (error) {
//                 console.error('Error adding tweet:', error)
//                 throw error
//             }
//         },
//
//         async editTweet({ payload }: TweetEditRequest): Promise<TweetResponse> {
//             const authStore = useAuthStore();
//             if (!authStore.isAuthenticated) {
//                 console.error('User is not authenticated');
//                 throw new Error('User is not authenticated');
//             }
//             try {
//                 const response = await axios.put<TweetResponse>(`/tweets`, { payload })
//                 const index = this.tweets.findIndex(tweet => tweet.id === payload.id)
//                 if (index !== -1) {
//                     this.tweets[index] = response.data
//                 }
//                 return response.data
//             } catch (e) {
//                 console.error('Error adding tweet:', e)
//                 throw e
//             }
//         },
//
//         async fetchTweets(page: number = this.page, limit: number = this.limit) {
//             this.isLoading = true;
//             this.error = null;
//
//             try {
//                 const findRequest: TweetFindRequest = { page, limit };
//
//                 const response = await fetch(`/tweets?page=${findRequest.page}&limit=${findRequest.limit}`);
//
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch tweets');
//                 }
//
//                 const data: TweetPageResponse = await response.json();
//                 this.tweets = data.tweets;
//                 this.totalTweets = data.totalTweets;
//                 this.isFirstPage = data.isFirstPage;
//                 this.isLastPage = data.isLastPage;
//                 this.page = page;
//             } catch (error) {
//                 this.error = error.message;
//             } finally {
//                 this.isLoading = false;
//             }
//         }
//     }
// })
