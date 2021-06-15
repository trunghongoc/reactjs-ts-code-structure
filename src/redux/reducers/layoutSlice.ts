import { createSlice } from '@reduxjs/toolkit'

export const layoutSlice: any = createSlice({
  name: 'layout',
  initialState: {
    headerLinks: []
  },
  reducers: {
    setHeaderLinks: (state: any, action: any): void => {
      state.headerLinks = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setHeaderLinks } = layoutSlice.actions

export default layoutSlice.reducer
