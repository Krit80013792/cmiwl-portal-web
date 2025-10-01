import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { ReduxState } from '@/stores/redux'

export interface UserSlice {}

const initialState: UserSlice = {}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserSlice: (state, action: PayloadAction<UserSlice>) => {
      Object.assign(state, action.payload)
    },
    clearUserSlice: (state) => {
      Object.keys(state).forEach((key) => {
        // @ts-ignore
        delete state[key]
      })
    },
  },
})

export const selectUserSlice = (state: ReduxState) => state.userSlice
