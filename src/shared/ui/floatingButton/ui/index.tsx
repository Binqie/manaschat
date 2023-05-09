import { Fab } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { Link } from 'react-router-dom'
import { PRIVATE_ROUTES } from 'shared/config/consts'

export default function FloatingActionButton() {
  return (
    <Link to={PRIVATE_ROUTES.POST_CREATION}>
      <Fab
        color='primary'
        aria-label='edit'
      >
        <EditIcon />
      </Fab>
    </Link>
  )
}
