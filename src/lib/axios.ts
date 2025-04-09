import { env } from '@/env'
import axios from 'axios'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  // cookies do frontend para o backend
  withCredentials: true,  
})

if (env.VITE_ENABLE_API_DELAY) {

  api.interceptors.response.use(async (config) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return config
  } )
}
