import { Button } from '@mui/material'
import { IButtonProps } from '../model'

const MyButton = ({ color = 'primary', text = 'button' }: IButtonProps) => {
  return (
    <Button
      variant="contained"
      color={color}
    >
      {text}
    </Button>
  )
}

export default MyButton
