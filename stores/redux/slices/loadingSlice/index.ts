import { createSlice } from '@reduxjs/toolkit'
import type { ReduxState } from '@/stores/redux'

export interface LoadingState {
  isHidden: boolean
}

const initialState: LoadingState = {
  isHidden: true,
}

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    show: (state) => {
      state.isHidden = false
    },
    hide: (state) => {
      state.isHidden = true
    },
  },
})

export const selectLoading = (state: ReduxState) => state.loading
