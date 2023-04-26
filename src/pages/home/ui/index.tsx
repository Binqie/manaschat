import CommentCard from 'entities/postComment/ui'
import ElectionCard from 'entities/postElection/ui'
import SuggestionCard from 'entities/postSuggestion/ui'
import MainContainer from '../../../widgets/mainContainer/ui'

const Home = () => {
  return (
    <div>
      <MainContainer>
        <ElectionCard />
        <SuggestionCard />
        <CommentCard />
      </MainContainer>
    </div>
  )
}

export default Home
