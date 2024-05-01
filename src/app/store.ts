import { configureStore, isAction } from "@reduxjs/toolkit";
import dataReducer from "../features/data/dataReducers"


export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
})


export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>