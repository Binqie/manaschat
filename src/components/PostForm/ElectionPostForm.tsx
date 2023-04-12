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

const ElectionPostForm = () => {
  return (
    <PostFormContainer
      type='election'
      inputs={inputs}
    />
  )
}

export default ElectionPostForm
