import { Routes, Route } from 'react-router-dom'
import { PublicRoutes, PrivateRoutes } from 'shared/config/routes'
import Error from 'pages/error'
import { IRoute } from 'shared/model/Types'

const Router = () => {
  return (
    <Routes>
      {PublicRoutes.map(({ path, element }: IRoute) => (
        <Route
          key={path}
          path={path}
          element={element}
        />
      ))}
      {PrivateRoutes.map(({ path, element }: IRoute) => (
        <Route
          key={path}
          path={path}
          element={element}
        />
      ))}
      <Route
        path='*'
        element={<Error />}
      />
    </Routes>
  )
}

export default Router
