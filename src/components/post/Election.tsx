import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { Box, Button } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { BiCommentAdd } from 'react-icons/bi'

import { IPostProps, PostTypesEnum } from 'shared/model/Types'
import { GetUserIdByCookies } from 'shared/lib/getUserIdByCookies'
import { DeletePostRequest } from 'shared/lib/deletePostRequest'
import { useAppDispatch } from 'shared/hooks'
import { deletePost } from 'app/store/slices/PostSlice'
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { BASE_URL, PRIVATE_ROUTES } from 'shared/config/consts'
import { $api } from 'shared/api'
import PostModal from 'widgets/postModal'

interface IElectionPostResult {
  electionPostDetailId: number
}

const CreateElectionPostResult = async (data: IElectionPostResult) => {
  return await $api.post(
    `${BASE_URL}/PostResults/CreateElectionPostResult`,
    data
  )
}

export default function ElectionCard({
  post,
  isButtonHidden = false,
}: IPostProps) {
  const dispatch = useAppDispatch()
  const [selectedValue, setSelectedValue] = useState<number>(
    post.electionPostDetailsList.filter(
      (item) =>
        item.id ===
        post.electionPostResultsList.filter(
          (item) => item.authorId === GetUserIdByCookies()
        )[0]?.electionPostDetailId
    )[0]?.id
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
  const handlePostDelete = async (postId: number) => {
    dispatch(deletePost(postId))
    const response = await DeletePostRequest(postId)
    console.log(response)
  }
  const handlePostResultRequest = async () => {
    const data: IElectionPostResult = {
      electionPostDetailId: selectedValue,
    }

    const response = await CreateElectionPostResult(data)
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
            aria-labelledby='demo-radio-buttons-group-label'
            defaultValue='female'
            name='radio-buttons-group'
            value={selectedValue}
          >
            {post.electionPostDetailsList.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <FormControlLabel
                  value={item.id}
                  control={<Radio />}
                  label={item.variant}
                  onClick={() => setSelectedValue(item.id)}
                />
                <Typography
                  variant='body2'
                  color='text.primary'
                >
                  {
                    post.electionPostResultsList.filter(
                      (variant) => variant.electionPostDetailId === item.id
                    ).length
                  }
                </Typography>
              </Box>
            ))}
          </RadioGroup>
          <Button
            variant='outlined'
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
            <ElectionCard
              post={post}
              isButtonHidden={isModalOpen}
            />
          </PostModal>
        </Box>
      </CardContent>
    </Card>
  )
}
