import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface state {
  editValue: boolean
}

const initialState: state = {
  editValue: false
}

export const editAlertOpenerSlice = createSlice({
  name: 'openEditAlert',
  initialState,
  reducers: {
    setVisisbleEditAlert: (state, action: PayloadAction<boolean>) => {
      state.editValue = action.payload
    }
  }
})

export const {setVisisbleEditAlert} = editAlertOpenerSlice.actions

export const selectCount = (state: RootState) => state.missingID

export default editAlertOpenerSlice.reducer
