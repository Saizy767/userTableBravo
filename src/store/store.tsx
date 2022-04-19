import { combineReducers, configureStore } from '@reduxjs/toolkit'
import addingAlertOpenerSlice from './reducers/AddingAlertOpenerSlice'
import editAlertOpenerSlice from './reducers/EditAlertOpenerSlice'
import findIDSlice from './reducers/findIDSlice'
import { registrationAPI } from './services/registrationServices'
import { userAPI } from './services/userServices'

export const rootReducer = combineReducers({
    missingID: findIDSlice,
    openEditAlert: editAlertOpenerSlice,
    openAddingAlert: addingAlertOpenerSlice,
    [userAPI.reducerPath]: userAPI.reducer,
    [registrationAPI.reducerPath]: registrationAPI.reducer,
})

export const setupStore = () =>{
  return configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(userAPI.middleware, registrationAPI.middleware),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']