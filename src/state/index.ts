import { configureStore } from '@reduxjs/toolkit'
import sessionDataReducer from './sessionDataSlice'

const store = configureStore({
  reducer: {
    sessionData: sessionDataReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
