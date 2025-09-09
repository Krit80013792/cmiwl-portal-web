import { createSlice } from '@reduxjs/toolkit'
import type { ReduxState } from '@/stores/redux'

export interface loadingState {
	isHidden: boolean
}

const initialState: loadingState = {
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
