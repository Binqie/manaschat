import { ThemeProvider } from '@mui/material'
import { lightTheme, darkTheme } from 'shared/themes'

export const withTheme = (component: () => React.ReactNode) => () =>
  <ThemeProvider theme={lightTheme}>{component()}</ThemeProvider>
