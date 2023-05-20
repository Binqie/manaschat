import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { IPostProps } from 'shared/model/Types'
import { GetUserIdByCookies } from 'shared/lib/getUserIdByCookies'
import { DeletePostRequest } from 'shared/lib/deletePostRequest'
import { useAppDispatch } from 'shared/hooks'
import { deletePost } from 'app/store/slices/PostSlice'
import { useState } from 'react'
import { PRIVATE_ROUTES } from 'shared/config/consts'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import { BiCommentAdd } from 'react-icons/bi'
import Button from '@mui/material/Button'
import PostModal from 'widgets/postModal'

export default function CommentCard({
  post,
  isButtonHidden = false,
}: IPostProps) {
  const dispatch = useAppDispatch()
  const handlePostDelete = (postId: number) => {
    dispatch(deletePost(postId))
    DeletePostRequest(postId)
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [isModalOpen, setModalOpen] = useState(false)

  const handleModalOpen = () => {
    setModalOpen(true)
  }
  const handleModalClose = () => {
    setModalOpen(false)
  }
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Card
      sx={{ width: 350 }}
      variant='outlined'
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label='recipe'
          >
            R
          </Avatar>
        }
        action={
          GetUserIdByCookies() === post.authorId ? (
            <>
              <IconButton
                aria-label='settings'
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <Link
                  to={`${PRIVATE_ROUTES.POST_EDITING}?id=${post.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <MenuItem>Edit</MenuItem>
                </Link>
                <MenuItem
                  onClick={() => handlePostDelete(post.id)}
                  style={{ color: 'red' }}
                >
                  Delete
                </MenuItem>
              </Menu>
            </>
          ) : null
        }
        title={post.authorFullname}
        subheader={`${new Date(
          Date.parse(post.createdAt)
        ).toLocaleDateString()}`}
      />
      <CardMedia
        component='img'
        height='194'
        image={`data:image/png;base64, ${post.image}`}
      />
      <CardContent>
        <Typography
          variant='h5'
          color='text.primary'
        >
          {post.title}
        </Typography>
        <Typography
          variant='body2'
          color='text.primary'
          marginBottom='spacing'
          sx={{ marginBottom: 3 }}
        >
          {post.body}
        </Typography>
        <Box>
          <Button
            onClick={handleModalOpen}
            sx={{ display: isButtonHidden ? 'none' : 'block' }}
          >
            <BiCommentAdd size={28} />
          </Button>
          <PostModal
            isOpen={isModalOpen}
            handleModalClose={handleModalClose}
          >
            <CommentCard
              post={post}
              isButtonHidden={isModalOpen}
            />
          </PostModal>
        </Box>
      </CardContent>
    </Card>
  )
}
