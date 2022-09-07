import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = { value: [] }

export const memoSlice = createSlice({
  name: "memo",
  initialState,
  reducers: {
    setMemo: (state, action: PayloadAction<any>) => {
      state.value = action.payload
    },
  },
})
export const { setMemo } = memoSlice.actions
export default memoSlice.reducer
