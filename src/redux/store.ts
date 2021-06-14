import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './reducers/counterSlice'
import userSlice from './reducers/userSlice'
import spinSlice from './reducers/spinSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userSlice,
    spin: spinSlice
  }
})
