import axios from 'axios'

const Http = axios.create({
    baseURL: import.meta.env.VITE_APP_URL,
    // headers: {
    //     'Access-Control-Allow-Origin': '*'
    // },
});

// Add request interceptor
Http.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Add response interceptor
Http.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            localStorage.removeItem('token')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)


export default Http;