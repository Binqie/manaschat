import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import { $api } from 'shared/api'
import { BASE_URL } from 'shared/config/consts'
import { IPost } from 'shared/model/Types'

interface PostState {
  posts: IPost[]
}

const initialState: PostState = {
  posts: [],
}

export const PostSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<IPost[]>) => {
      state.posts = action.payload
    },
    addPost: (state, action: PayloadAction<IPost>) => {
      state.posts.push(action.payload)
    },
    editPost: (state, action) => {
      state.posts = state.posts.filter((post) => {
        if (post.id === action.payload.id) {
          return action.payload
        }
        return post
      })
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload)
    },
  },
})

export const { setPosts, addPost, editPost, deletePost } = PostSlice.actions

export default PostSlice.reducer
