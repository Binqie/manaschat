import { Routes, Route, Navigate } from 'react-router-dom'
import { PrivateRoutes, PublicRoutes } from '../constants/routes'

const Router = () => {
  return (
    <Routes>
      {PublicRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={element}
        />
      ))}
      {PrivateRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={element}
        />
      ))}
    </Routes>
  )
}

export default Router
