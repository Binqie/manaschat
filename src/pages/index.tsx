import { Routes, Route } from 'react-router-dom'
import { PublicRoutes, PrivateRoutes } from 'shared/config/routes'
import { IRoute } from 'shared/model/Types'
import { useAppSelector } from 'shared/hooks'
import Signin from './signin'
import { ThemeProvider } from '@mui/material'
import { lightTheme, darkTheme } from 'shared/themes'
import { PRIVATE_ROUTES } from 'shared/config/consts'
import Users from './admin/pages/Users'
import Requests from './admin/pages/Requests'
import AdminTest from './admin'
import Home from './home'
import PostModal from 'widgets/postModal'
import Post from './post'
import Posts from './posts'
import PostCreation from './postCreation'

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
          <>
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
            <Route path='/posts'>
              <Route
                index
                element={<Posts />}
              />
              <Route
                path=':postId'
                element={<Post />}
              />
              <Route
                path='new'
                element={<PostCreation />}
              />
            </Route>
          </>
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
