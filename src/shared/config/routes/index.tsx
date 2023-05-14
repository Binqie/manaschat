import { PUBLIC_ROUTES, PRIVATE_ROUTES } from '../consts'

import Signin from 'pages/signin'
import Signup from 'pages/signup'
import Home from 'pages/home'
import PostCreation from 'pages/postCreation'
import { IRoute } from 'shared/model/Types'
import Admin from 'pages/admin'

export const PublicRoutes: IRoute[] = [
  {
    path: PUBLIC_ROUTES.SIGNIN,
    element: <Signin />,
  },
  {
    path: PUBLIC_ROUTES.SIGNUP,
    element: <Signup />,
  },
]

export const PrivateRoutes: IRoute[] = [
  {
    path: PRIVATE_ROUTES.HOME,
    element: <Home />,
  },
  {
    path: PRIVATE_ROUTES.POST_CREATION,
    element: <PostCreation />,
  },
  {
    path: PRIVATE_ROUTES.ADMIN,
    element: <Admin />,
  },
]
