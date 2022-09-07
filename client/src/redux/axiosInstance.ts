import axios, { AxiosError } from 'axios'

// const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : '/api';

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.API_URL,
})

axiosInstance.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (!error.response) {
      return Promise.reject(error)
    }

    if (error.response.status === 401) {
      console.error('Code 401 (Unauthorized)')
      error.response.data = 'Unauthorized error'
    }

    if (error.response.status >= 500 && error.response.status < 600) {
      error.response.data = 'Server error'
    }

    return Promise.reject(error)
  },
)

export const setAuthToken = (token: string) => {
  axiosInstance.defaults.headers.common['Cookie'] = `jwt ${token}`
}

export const removeAuthToken = () => {
  delete axiosInstance.defaults.headers.common['Cookie']
}

export default axiosInstance
