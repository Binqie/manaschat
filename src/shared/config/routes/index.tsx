import { PUBLIC_ROUTES, PRIVATE_ROUTES } from '../consts'

import Signin from 'pages/signin/ui'
import Signup from 'pages/signup/ui'
import Home from 'pages/home/ui'
import PostCreation from 'pages/postCreation/ui'
import { IRoute } from 'shared/model/Types'

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
]
