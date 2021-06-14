import { createSlice } from '@reduxjs/toolkit'

export const spinSlice: any = createSlice({
  name: 'spin',
  initialState: {
    isShowGlobalSpin: false
  },
  reducers: {
    setGlobalSpin: (state: any, action: any): void => {
      state.isShowGlobalSpin = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setGlobalSpin } = spinSlice.actions

export default spinSlice.reducer
