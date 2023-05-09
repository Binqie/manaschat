import CommentCard from 'entities/postComment/ui'
import ElectionCard from 'entities/postElection/ui'
import SuggestionCard from 'entities/postSuggestion/ui'
import MainContainer from '../../../widgets/mainContainer/ui'
import FloatingActionButton from 'shared/ui/floatingButton/ui'
import { useGetPostsQuery } from 'app/store/api/postApi'

const Home = () => {
  const {data: posts, error, isLoading} = useGetPostsQuery()
  console.log(posts)

  return (
    <div>
      <MainContainer>
        <ElectionCard />
        <SuggestionCard />
        <CommentCard />
        <FloatingActionButton/>
      </MainContainer>
    </div>
  )
}

export default Home
