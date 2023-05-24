import { useState } from 'react'
import * as React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Box, Button, Container } from '@mui/material'

import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { IPostProps } from 'shared/model/Types'
import { GetUserIdByCookies } from 'shared/lib/getUserIdByCookies'
import { DeletePostRequest } from 'shared/lib/deletePostRequest'
import { useAppDispatch } from 'shared/hooks'
import { deletePost } from 'app/store/slices/PostSlice'
import { Link, Navigate } from 'react-router-dom'
import { BASE_URL, PRIVATE_ROUTES } from 'shared/config/consts'
import { $api } from 'shared/api'
import { BiCommentAdd } from 'react-icons/bi'
import PostModal from 'widgets/postModal'

interface ISuggestionPostResult {
  email: string
  postId: number
  isAgree: boolean
}

const CreateSuggestionPostResult = async (data: ISuggestionPostResult) => {
  return await $api.post(
    `${BASE_URL}/PostResults/CreateSuggestionPostResult`,
    data
  )
}

export default function SuggestionCard({
  post,
  isButtonHidden = false,
}: IPostProps) {
  const dispatch = useAppDispatch()
  const [selectedValue, setSelectedValue] = useState(
    post.suggestionPostResultsList.filter(
      (item) => item.authorId === GetUserIdByCookies()
    )[0]?.isAgree
  )

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
  const handleChange = (option: boolean) => {
    setSelectedValue(option)
  }
  const handlePostDelete = (postId: number) => {
    dispatch(deletePost(postId))
    DeletePostRequest(postId)
  }
  const handlePostResultRequest = async () => {
    const data: ISuggestionPostResult = {
      email: '1904.01027@manas.edu.kg',
      postId: post.id,
      isAgree: selectedValue,
    }

    const response = await CreateSuggestionPostResult(data)
    console.log(response)
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
        >
          {post.body}
        </Typography>
        <FormControl style={{ width: '100%' }}>
          <RadioGroup
            aria-labelledby='demo-controlled-radio-buttons-group'
            name='controlled-radio-buttons-group'
            value={selectedValue}
            onChange={(e) => handleChange(Boolean(e.target.value))}
            style={{ display: 'flex' }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <FormControlLabel
                value={true}
                control={<Radio />}
                label='Yes'
              />
              <Typography
                variant='body2'
                color='text.primary'
              >
                {
                  post.suggestionPostResultsList.filter((item) => item.isAgree)
                    .length
                }
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <FormControlLabel
                value={false}
                control={<Radio />}
                label='No'
              />
              <Typography
                variant='body2'
                color='text.primary'
              >
                {
                  post.suggestionPostResultsList.filter((item) => !item.isAgree)
                    .length
                }
              </Typography>
            </Box>
          </RadioGroup>
          <Button
            variant='outlined'
            color='secondary'
            onClick={handlePostResultRequest}
            sx={{ marginBottom: 3 }}
          >
            Vote
          </Button>
        </FormControl>
        <Box>
          <Button
            onClick={handleModalOpen}
            sx={{ display: isButtonHidden ? 'none' : 'block' }}
          >
            <BiCommentAdd size={28} />
          </Button>
          <PostModal
            postId={post.id}
            isOpen={isModalOpen}
            handleModalClose={handleModalClose}
          >
            <SuggestionCard
              post={post}
              isButtonHidden={isModalOpen}
            />
          </PostModal>
        </Box>
      </CardContent>
    </Card>
  )
}
