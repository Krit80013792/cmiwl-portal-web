import { combineReducers } from 'redux'
import { userSlice } from './slices/userSlice'
import { prefillDataSlice } from './slices/prefillDataSlice'
import { loadingSlice } from './slices/loadingSlice'
import { paymentSlice } from './slices/paymentSlice'

const persistReducers = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [prefillDataSlice.name]: prefillDataSlice.reducer,
  [loadingSlice.name]: loadingSlice.reducer,
  [paymentSlice.name]: paymentSlice.reducer,
})

export default persistReducers
