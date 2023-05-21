import { createTheme } from '@mui/material'
import { ThemeOptions } from '@mui/material'

export const lightTheme: ThemeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: '#757ce8',
      main: '#e53935',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#039be5',
      dark: '#ba000d',
      contrastText: '#000',
    },
    text: {
      primary: '#616161',
      secondary: '#0d47a1',
    },
  },
  spacing: 5,
})

export const darkTheme: ThemeOptions = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    text: {
      primary: '#616161',
      secondary: '#0d47a1',
    },
  },
  spacing: 5,
})
