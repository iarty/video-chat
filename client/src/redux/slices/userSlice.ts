import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IUserById, IUserData } from '../../../models/user'

interface IState {
  user: IUserData
  userById: IUserById
}

const initialState: IState = { user: {}, userById: {} }

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserData>) => {
      state.user = action.payload
    },
    setUserById: (state, action: PayloadAction<IUserById>) => {
      state.userById = action.payload
    },
  },
})

export const { setUser, setUserById } = userSlice.actions

export const selectUser = (state: RootState) => state.user
