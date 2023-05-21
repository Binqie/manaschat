import { List } from '@mui/material'
import { IComment } from 'shared/model/Types'
import Comment from 'components/comment'
import { $api } from 'shared/api'
import { useEffect, useState } from 'react'

const SendDeleteCommentRequest = async (commentId: number) => {
  return await $api.delete(`/Comments/DeleteById?id=${commentId}`)
}

const GetCommentsByPostId = async (postId: number) => {
  return await $api.get(`/Comments/GetByPostId?postId=${postId}`)
}

const CommentsGroup = (props: {
  postId: number
  handleModalClose: () => void
  handleDeleteComment: () => void
}) => {
  const [commentsList, setCommentsList] = useState([])

  const handleDeleteComment = async (id: number) => {
    const response = await SendDeleteCommentRequest(id)
    console.log(response)
    props.handleModalClose()
    props.handleDeleteComment()
  }

  useEffect(() => {
    const fetchComments = async () => {
      const response = await GetCommentsByPostId(props.postId)
      console.log('data', response.data)
      setCommentsList(response.data)
      console.log('comments', commentsList)
    }
    fetchComments()
  }, [])

  return (
    <List
      sx={{
        width: '100%',
      }}
    >
      {commentsList.map((comment: IComment, index) => (
        <Comment
          key={index}
          text={comment.text}
          author={comment.author}
          deleteComment={() => handleDeleteComment(comment.id)}
        />
      ))}
    </List>
  )
}

export default CommentsGroup
