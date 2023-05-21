import { Snackbar } from '@mui/material'

const MyAlert = (props: {
  isOpen: boolean
  message: string
  handleClose: () => void
}) => {
  return (
    <Snackbar
      open={props.isOpen}
      autoHideDuration={3000}
      onClose={props.handleClose}
      message={props.message}
    />
  )
}

export default MyAlert
