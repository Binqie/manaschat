import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import UserSlice from './slices/UserSlice'
import PostSlice from './slices/PostSlice'
import ThemeSlice from './slices/ThemeSlice'

export const store = configureStore({
  reducer: {
    user: UserSlice,
    posts: PostSlice,
    theme: ThemeSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
