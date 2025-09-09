import { combineReducers } from 'redux'
import { carUserDetailSlice } from './slices/carUserDetailSlice'
import { prefillDataSlice } from './slices/prefillDataSlice'
import { loadingSlice } from './slices/loadingSlice'

const persistReducers = combineReducers({
  [carUserDetailSlice.name]: carUserDetailSlice.reducer,
  [prefillDataSlice.name]: prefillDataSlice.reducer,
  [loadingSlice.name]: loadingSlice.reducer,
})

export default persistReducers
