import { FC } from 'react'
import PostFormContainer from '../../containers/PostFormContainer'

const inputs = [
  {
    id: 'selectedImage',
    name: 'image',
    type: 'file',
  },
  {
    id: 'selectedTitle',
    name: 'title',
    type: 'text',
    label: 'title',
  },
  {
    id: 'selectedDescription',
    name: 'description',
    type: 'text',
    label: 'description',
  },
]

const CommentPostForm: FC = () => {
  return (
    <PostFormContainer
      type='comment'
      inputs={inputs}
    />
  )
}

export default CommentPostForm
