import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { $api } from "shared/api";
import { BASE_URL } from "shared/config/consts";
import { IPost } from "shared/model/Types";

interface PostState {
  posts: IPost[];
  currentPost: IPost;
}

const initialState: PostState = {
  posts: [],
  currentPost: {
    authorFullname: "undefined",
    authorId: -1,
    body: "Body",
    createdAt: "1970-01-01T00:00:00.000000",
    electionPostDetailsList: [],
    electionPostResultsList: [],
    id: 67,
    image: "image",
    suggestionPostResultsList: [],
    title: "Title",
    type: 0,
  },
};

export const PostSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<IPost>) => {
      state.currentPost = action.payload;
    },
    setPosts: (state, action: PayloadAction<IPost[]>) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<IPost>) => {
      state.posts.push(action.payload);
    },
    editPost: (state, action) => {
      state.posts = state.posts.filter((post) => {
        if (post.id === action.payload.id) {
          return action.payload;
        }
        return post;
      });
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
});

export const { setPost, setPosts, addPost, editPost, deletePost } =
  PostSlice.actions;

export default PostSlice.reducer;
