import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Box, TextField, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { List } from '@mui/icons-material'

import { $api } from 'shared/api'
import { useEffect, useState } from 'react'
import { IComment } from 'shared/model/Types'
import Comment from 'components/comment'
import CommentsGroup from 'widgets/commentsGroup'
import MyAlert from 'ui/alert'

const SendCreateCommentRequest = async (postId: number, text: string) => {
  return await $api.post('/Comments/Create', { postId, text })
}

export default function PostModal({
  postId,
  isOpen,
  children,
  handleModalClose,
}: {
  postId: number
  isOpen: boolean
  children: React.ReactNode
  handleModalClose: () => void
}) {
  const [comment, setComment] = useState('')
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const descriptionElementRef = React.useRef<HTMLElement>(null)

  useEffect(() => {
    if (isOpen) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  const handleSendComment = async () => {
    const response = await SendCreateCommentRequest(postId, comment)
    handleModalClose()
    setAlertOpen(true)
    setAlertMessage('Comment added!')
  }

  const handleDeleteComment = () => {
    setAlertOpen(true)
    setAlertMessage('Comment deleted!')
  }

  return (
    <div>
      <MyAlert
        isOpen={alertOpen}
        message={alertMessage}
        handleClose={() => setAlertOpen(false)}
      />
      <Dialog
        open={isOpen}
        onClose={handleModalClose}
        scroll={'body'}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <DialogContent>
          <DialogContentText
            id='scroll-dialog-description'
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {children}
          </DialogContentText>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            marginTop={2}
          >
            <TextField
              id='outlined-basic'
              label='Comment'
              variant='outlined'
              size='small'
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              variant='contained'
              endIcon={<SendIcon />}
              onClick={handleSendComment}
            >
              Send
            </Button>
          </Box>
          <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'flex-start'}
            alignItems={'flex-start'}
            marginTop={2}
          >
            <CommentsGroup
              handleModalClose={handleModalClose}
              handleDeleteComment={handleDeleteComment}
              postId={postId}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
