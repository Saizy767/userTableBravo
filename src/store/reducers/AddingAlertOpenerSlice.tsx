import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface state {
  AddingValue: boolean
}

const initialState: state = {
  AddingValue: false
}

export const addingAlertOpenerSlice = createSlice({
  name: 'openAddingAlert',
  initialState,
  reducers: {
    setVisisbleAddingAlert: (state, action: PayloadAction<boolean>) => {
      state.AddingValue = action.payload
    }
  }
})

export const {setVisisbleAddingAlert} = addingAlertOpenerSlice.actions

export const selectCount = (state: RootState) => state.missingID

export default addingAlertOpenerSlice.reducer
