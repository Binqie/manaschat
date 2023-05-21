import { IconButton, ListItem, ListItemText } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

interface IComment {
  author: string | undefined | null
  text: string
  deleteComment: () => void
}

const Comment = (props: IComment) => {
  return (
    <ListItem
      sx={{
        width: '100%',
        border: '1px solid gray',
        margin: '5px 0',
      }}
      secondaryAction={
        <IconButton
          edge='end'
          aria-label='delete'
          onClick={props.deleteComment}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText
        primary={props.author}
        secondary={props.text}
      />
    </ListItem>
  )
}

export default Comment
