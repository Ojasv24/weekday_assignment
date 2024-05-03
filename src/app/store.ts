import { configureStore, isAction } from "@reduxjs/toolkit";
import jobReducer from "../features/data/dataReducers"


export const store = configureStore({
  reducer: {
    data: jobReducer,
  },
})


export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>