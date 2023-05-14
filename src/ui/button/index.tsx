import { Button } from '@mui/material'
interface IButtonProps {
  color?: 'success' | 'error' | 'primary' | 'secondary'
  text: string
}
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
