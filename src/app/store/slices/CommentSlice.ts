import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { $api } from "shared/api";
import { BASE_URL } from "shared/config/consts";
import { IComment, ICommentCreate, IPost } from "shared/model/Types";

interface CommentSlice {
  comments: IComment[];
}

const initialState: CommentSlice = {
  comments: [],
};

export const CommentSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<IComment[]>) => {
      state.comments = action.payload;
    },
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    editComment: (state, action) => {
      state.comments = state.comments.filter((comment) => {
        if (comment.id === action.payload.id) {
          return action.payload;
        }
        return comment;
      });
    },
    deleteComment: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
    },
  },
});

export const { setComments, addComment, editComment, deleteComment } =
  CommentSlice.actions;

export default CommentSlice.reducer;
