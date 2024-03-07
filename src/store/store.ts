import { configureStore } from "@reduxjs/toolkit"
import { initialReducer } from "./reducers/initialData"

export const store = configureStore({
    reducer:{
        initial: initialReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch