import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  isAuthorized: Boolean
  user: Object
}

const initialState: UserState = {
  isAuthorized: false,
  user: {},
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Object>) => {
        state.user = action.payload;
    },
  },
})

export const { setUser } = UserSlice.actions;

export default UserSlice.reducer;