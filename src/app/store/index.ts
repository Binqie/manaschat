import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import UserSlice from "./slices/UserSlice";
import PostSlice from "./slices/PostSlice";
import ThemeSlice from "./slices/ThemeSlice";
import CommentSlice from "./slices/CommentSlice";

export const store = configureStore({
  reducer: {
    user: UserSlice,
    posts: PostSlice,
    comments: CommentSlice,
    theme: ThemeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
