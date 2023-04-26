import { FC } from 'react'
import PostFormContainer from 'entities/postFormContainer/ui'
import { PostFormInputs } from 'shared/model/Inputs'

const CommentPostForm: FC = () => {
  return (
    <PostFormContainer
      type='comment'
      inputs={PostFormInputs}
    />
  )
}

export default CommentPostForm
