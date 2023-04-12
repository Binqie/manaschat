import { PUBLIC_ROUTES, PRIVATE_ROUTES } from './consts'

import Signin from '../pages/Signin'
import Signup from '../pages/Signup'
import Home from '../pages/Home'
import PostCreation from '../pages/PostCreation'

export const PublicRoutes = [
  {
    path: PUBLIC_ROUTES.SIGNIN,
    element: <Signin />,
  },
  {
    path: PUBLIC_ROUTES.SIGNUP,
    element: <Signup />,
  },
]

export const PrivateRoutes = [
  {
    path: PRIVATE_ROUTES.HOME,
    element: <Home />,
  },
  {
    path: PRIVATE_ROUTES.POST_CREATION,
    element: <PostCreation />,
  },
]
