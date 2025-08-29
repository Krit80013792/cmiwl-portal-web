import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { ReduxState } from '@/stores/redux'

export interface PrefillDataSliceState {}

const initialState: PrefillDataSliceState = {}

export const prefillDataSlice = createSlice({
  name: 'prefillData',
  initialState,
  reducers: {
    setPrefillData: (state, action: PayloadAction<PrefillDataSliceState>) => {
      Object.assign(state, action.payload)
    },
    clearPrefillData: (state) => {
      Object.keys(state).forEach((key) => {
        // @ts-ignore
        delete state[key]
      })
    },
  },
})

export const selectPrefillData = (state: ReduxState) => state.prefillData
