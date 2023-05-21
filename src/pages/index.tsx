import { Routes, Route } from 'react-router-dom'
import { PublicRoutes, PrivateRoutes } from 'shared/config/routes'
import { IRoute } from 'shared/model/Types'
import { useAppSelector } from 'shared/hooks'
import Signin from './signin'
import { ThemeProvider } from '@mui/material'
import { lightTheme, darkTheme } from 'shared/themes'

const Router = () => {
  const isAuthorized = useAppSelector((store) => store.user.isAuthorized)
  const theme = useAppSelector((store) => store.theme.theme)
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Routes>
        {PublicRoutes.map(({ path, element }: IRoute) => (
          <Route
            key={path}
            path={path}
            element={element}
          />
        ))}
        {isAuthorized &&
          PrivateRoutes.map(({ path, element, children }: IRoute) => (
            <Route
              key={path}
              path={path}
              element={element}
            >
              {children &&
                children.map((child) => (
                  <Route
                    path={child.path}
                    element={child.element}
                  />
                ))}
            </Route>
          ))}
        <Route
          path='*'
          element={<Signin />}
        />
      </Routes>
    </ThemeProvider>
  )
}

export default Router
