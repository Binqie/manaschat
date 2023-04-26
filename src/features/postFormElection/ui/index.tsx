import PostFormContainer from 'entities/postFormContainer/ui'
import { PostFormInputs } from 'shared/model/Inputs'

const ElectionPostForm = () => {
  return (
    <PostFormContainer
      type='election'
      inputs={PostFormInputs}
    />
  )
}

export default ElectionPostForm
