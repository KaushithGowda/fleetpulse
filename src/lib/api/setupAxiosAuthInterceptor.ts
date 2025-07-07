import { axiosPrivate } from './axios'
import * as Keychain from 'react-native-keychain'

export const setupAxiosAuthInterceptor = () => {
  axiosPrivate.interceptors.request.use(async (config) => {
    try {
      const credentials = await Keychain.getGenericPassword({ service: 'auth-token' })
      const token = credentials && 'password' in credentials ? credentials.password : undefined
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
    } catch (e) {
      console.warn('Failed to get token from Keychain:', e)
    }
    return config
  })
}