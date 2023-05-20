import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import UserSlice from './slices/UserSlice'
import PostSlice from './slices/PostSlice'

export const store = configureStore({
  reducer: {
    user: UserSlice,
    posts: PostSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
