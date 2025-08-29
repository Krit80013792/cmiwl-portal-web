import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { ReduxState } from '@/stores/redux'

export interface CarUserDetailSliceState {}

const initialState: CarUserDetailSliceState = {}

export const carUserDetailSlice = createSlice({
  name: 'carUserDetail',
  initialState,
  reducers: {
    setCarUserDetail: (state, action: PayloadAction<CarUserDetailSliceState>) => {
      Object.assign(state, action.payload)
    },
    clearCarUserDetail: (state) => {
      Object.keys(state).forEach((key) => {
        // @ts-ignore
        delete state[key]
      })
    },
  },
})

export const selectCarUserDetail = (state: ReduxState) => state.carUserDetail
