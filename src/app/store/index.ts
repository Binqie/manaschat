import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import UserSlice from './slices/UserSlice'
import { postsApi } from './api/postApi'

export const store = configureStore({
  reducer: {
    user: UserSlice,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
