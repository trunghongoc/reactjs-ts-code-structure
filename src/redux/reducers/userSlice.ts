import { createSlice } from '@reduxjs/toolkit'

export const userSlice: any = createSlice({
  name: 'counter',
  initialState: {
    currentUser: {}
  },
  reducers: {
    setCurrentUser: (state: any, action: any): void => {
      state.currentUser = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setCurrentUser } = userSlice.actions

export default userSlice.reducer
