import {defineStore} from "pinia";
import {ref} from "vue";
import {Profile} from "../types/profile.ts";
import Http from "../http/axios.ts";

export const userProfileStore = defineStore('profile',() =>{
    const profile = ref<Profile | null>(null)
    const isLoading = ref<boolean>(false)
    const error = ref<string | null>()

    const registerUserProfile = async (payload: Profile) => {
        isLoading.value = true
        error.value = null;

        try {
            const response = await Http.post(`/user-profiles`, payload);
            if (response.status === 201){
                profile.value = response.data
                console.log('Profile registered successfully:' ,response.data);

                return response.data.id || payload.email;
            }
        } catch (error: any) {
            error.value = 'Failed to register user profile.'
            console.error("register user profile failed: ", error);
            throw error;
        } finally {
            isLoading.value = false
        }
    }

    // const fetchUserProfile = async (email: string) => {
    //     isLoading.value = true
    //     error.value = null
    //
    //     try {
    //         const response = await Http.get(`/user-profiles`);
    //         profile.value = response.data;
    //         console.log('Profile fetched successfully:', response.data);
    //     } catch (error: any){
    //         error.value = 'Failed to fetch user profile.';
    //         console.error('Fetch user profile failed:', err);
    //         throw err;
    //     } finally {
    //         isLoading.value = false
    //     }
    // }

    return {
        registerUserProfile,
        // fetchUserProfile,
        profile,
        isLoading,
        error,
    }
})