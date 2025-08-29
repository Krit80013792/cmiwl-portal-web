import { combineReducers } from 'redux'
import { carUserDetailSlice } from './slices/carUserDetailSlice'
import { prefillDataSlice } from './slices/prefillDataSlice'

const persistReducers = combineReducers({
  [carUserDetailSlice.name]: carUserDetailSlice.reducer,
  [prefillDataSlice.name]: prefillDataSlice.reducer,
})

export default persistReducers
