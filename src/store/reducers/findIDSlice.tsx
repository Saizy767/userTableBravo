import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '../../store/store'

interface FinderId {
  value: number
}

const initialState: FinderId = {
  value: 0
}

export const findIDSlice = createSlice({
  name: 'findID',
  initialState,
  reducers: {
    setMissingId: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    }
  }
})

export const {setMissingId} = findIDSlice.actions

export const selectCount = (state: RootState) => state.missingID

export default findIDSlice.reducer
