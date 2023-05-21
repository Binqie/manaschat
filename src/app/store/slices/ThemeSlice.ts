import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface ThemeState {
  theme: 'light' | 'dark'
}

const initialState: ThemeState = {
  theme: 'light',
}

export const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setAppTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload
    },
  },
})

export const { setAppTheme } = ThemeSlice.actions

export default ThemeSlice.reducer
