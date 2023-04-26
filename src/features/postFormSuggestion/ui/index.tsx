import { FC } from 'react'
import PostFormContainer from 'entities/postFormContainer/ui'
import { PostFormInputs } from 'shared/model/Inputs'

const SuggestionPostForm: FC = () => {
  return (
    <PostFormContainer
      type='suggestion'
      inputs={PostFormInputs}
    />
  )
}

export default SuggestionPostForm
