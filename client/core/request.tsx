import axios, { AxiosError } from 'axios'
import qs from 'qs'
import { API_URL } from 'config/settings'

const apiV1 = axios.create({
  baseURL: process.env.API_URL || API_URL,
})

const setupInterceptors = () => {
  apiV1.interceptors.request.use(
    config => {
      const accessToken = JSON.parse(localStorage.getItem('authStore') || '{}')
        ._user.accessToken
      return {
        ...config,
        headers: {
          ...config.headers,
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        paramsSerializer: params =>
          qs.stringify(params, { allowDots: true, skipNulls: true }),
      }
    },
    error => Promise.reject(error),
  )

  apiV1.interceptors.response.use(
    response => response,
    async error => {
      const originalRequestConfig: AxiosError['config'] & { _retry: boolean } =
        error.config
      console.log(originalRequestConfig)
      return Promise.reject(error)
    },
  )
}

export { setupInterceptors, apiV1 }
