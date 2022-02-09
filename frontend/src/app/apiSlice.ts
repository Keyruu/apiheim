import { createSlice } from '@reduxjs/toolkit'

export const apiSlice = createSlice({
  name: 'api',
  initialState: {
    value: {
      id: 0,
      name: "",
      url: "",
      apiType: ""
    },
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set } = apiSlice.actions

export default apiSlice.reducer
