import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './reducers/counterSlice'
import userSlice from './reducers/userSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userSlice
  }
})
