import { api, tagTypes } from '../api'
import { IUserById, IUserData } from '../../../models/user'
import { setUser, setUserById } from '../slices/userSlice'

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    getUserInfo: build.query<IUserData, unknown>({
      query: () => ({
        url: process.env.API_URL + '/auth/me',
        method: 'GET',
        onSuccess: async (dispatch, data) => {
          const response = data as IUserData
          dispatch(setUser(response))
        },
      }),
      providesTags: [tagTypes.user],
    }),
    getUserById: build.query<IUserById, unknown>({
      query: id => {
        return {
          url: process.env.API_URL + `/user/${id}`,
          method: 'GET',
          onSuccess: async (dispatch, data) => {
            const response = data as IUserById
            dispatch(setUserById(response))
          },
        }
      },
    }),
  }),
})

export const { useGetUserInfoQuery, useGetUserByIdQuery } = userApi
