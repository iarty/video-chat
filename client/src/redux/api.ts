import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './axiosBaseQuery'
import { HYDRATE } from 'next-redux-wrapper'

export const tagTypes = {
  user: 'User',
} as const

export type TagType = typeof tagTypes[keyof typeof tagTypes]

export const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery,
  tagTypes: Array.from(Object.values(tagTypes)),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: () => ({}),
})
