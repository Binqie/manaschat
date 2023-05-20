import { Routes, Route } from 'react-router-dom'
import { PublicRoutes, PrivateRoutes } from 'shared/config/routes'
import { IRoute } from 'shared/model/Types'
import { useAppSelector } from 'shared/hooks'
import Signin from './signin'

const Router = () => {
  const isAuthorized = useAppSelector((store) => store.user.isAuthorized)
  return (
    <Routes>
      {PublicRoutes.map(({ path, element }: IRoute) => (
        <Route
          key={path}
          path={path}
          element={element}
        />
      ))}
      {isAuthorized &&
        PrivateRoutes.map(({ path, element }: IRoute) => (
          <Route
            key={path}
            path={path}
            element={element}
          />
        ))}
      <Route
        path='*'
        element={<Signin />}
      />
    </Routes>
  )
}

export default Router
