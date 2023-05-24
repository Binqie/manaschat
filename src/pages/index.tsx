import { Routes, Route } from 'react-router-dom'
import { PublicRoutes, PrivateRoutes } from 'shared/config/routes'
import { IRoute } from 'shared/model/Types'
import { useAppSelector } from 'shared/hooks'
import Signin from './signin'
import { ThemeProvider } from '@mui/material'
import { lightTheme, darkTheme } from 'shared/themes'
import { PRIVATE_ROUTES } from 'shared/config/consts'
import Users from './admin-test/pages/Users'
import Requests from './admin-test/pages/Requests'
import AdminTest from './admin-test'

const Router = () => {
  const isAuthorized = useAppSelector((store) => store.user.isAuthorized)
  const user = useAppSelector((store) => store.user.user)
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
        {(isAuthorized || user.type === 2) && (
          <Route
            path={PRIVATE_ROUTES.ADMIN}
            element={<AdminTest />}
          >
            <Route
              index
              element={<Users />}
            />
            <Route
              path='requests'
              element={<Requests />}
            />
          </Route>
        )}
        <Route
          path='*'
          element={<Signin />}
        />
      </Routes>
    </ThemeProvider>
  )
}

export default Router
