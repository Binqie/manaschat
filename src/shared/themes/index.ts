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
      main: '#2b2a2a',
      dark: '#777676',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#e54203',
      contrastText: '#000000',
    },
    text: {
      primary: '#fbf7f7',
      secondary: '#ce4009',
    },
    background: {
      paper: '#232222',
      default: '#201f1f',
    },
  },
  spacing: 5,
})
