import { PUBLIC_ROUTES, PRIVATE_ROUTES } from '../consts'

import Signin from 'pages/signin'
import Signup from 'pages/signup'
import Home from 'pages/home'
import { IRoute } from 'shared/model/Types'
import Confirm from 'pages/confirm'
import ResetPassword from 'pages/resetPassword'
import PostCreation from 'pages/postCreation'
import PostEdition from 'pages/postEdition'
import ProfilePage from 'pages/profile'
import AdminTest from 'pages/admin'

export const PublicRoutes: IRoute[] = [
  {
    path: PUBLIC_ROUTES.SIGNIN,
    element: <Signin />,
  },
  {
    path: PUBLIC_ROUTES.SIGNUP,
    element: <Signup />,
  },
  {
    path: PUBLIC_ROUTES.CONFIRM,
    element: <Confirm />,
  },
  {
    path: PUBLIC_ROUTES.RESET_PASSWORD,
    element: <ResetPassword />,
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
    path: PRIVATE_ROUTES.POST_EDITING,
    element: <PostEdition />,
  },
  {
    path: PRIVATE_ROUTES.PROFILE,
    element: <ProfilePage />,
  },
  {
    path: PRIVATE_ROUTES.ADMIN,
    element: <AdminTest />,
  },
]
