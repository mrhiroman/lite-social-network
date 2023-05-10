import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux";

import user from './user/slice'
import posts from './posts/slice'
import friends from './friends/slice'
import modals from './modals/slice'

export const store = configureStore({
    reducer: {
        user,
        posts,
        friends,
        modals
    },
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()