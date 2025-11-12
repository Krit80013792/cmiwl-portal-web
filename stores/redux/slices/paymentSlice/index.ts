import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { ReduxState } from '@/stores/redux'

export interface PaymentSliceState {
  paymentNo: string | null
  paymentStatus: 'idle' | 'processing' | 'success' | 'failed'
}

const initialState: PaymentSliceState = {
  paymentNo: null,
  paymentStatus: 'idle',
}

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPayment: (state, action: PayloadAction<PaymentSliceState>) => {
      state.paymentNo = action.payload.paymentNo
      state.paymentStatus = action.payload.paymentStatus
    },
    clearPayment: (state) => {
      state.paymentNo = null
      state.paymentStatus = 'idle'
    },
  },
})

export const selectPayment = (state: ReduxState) => state.payment
