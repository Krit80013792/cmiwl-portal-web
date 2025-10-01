import { combineReducers } from 'redux'
import { userSlice } from './slices/userSlice'
import { prefillDataSlice } from './slices/prefillDataSlice'
import { loadingSlice } from './slices/loadingSlice'

const persistReducers = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [prefillDataSlice.name]: prefillDataSlice.reducer,
  [loadingSlice.name]: loadingSlice.reducer,
})

export default persistReducers
