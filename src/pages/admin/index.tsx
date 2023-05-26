import { Drawer } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarAdmin from 'widgets/nabvarAdmin'

const AdminTest = () => {
  return (
    <div>
      <NavbarAdmin />
      <Outlet />
    </div>
  )
}

export default AdminTest
