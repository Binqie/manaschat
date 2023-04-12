import Router from './router'
import './App.css'
import { ThemeProvider } from '@mui/material'
import { lightTheme, darkTheme } from './config/theme'

export default function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <div className='App'>
        <Router />
      </div>
    </ThemeProvider>
  )
}
