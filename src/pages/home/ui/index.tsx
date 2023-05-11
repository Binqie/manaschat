import CommentCard from 'entities/postComment/ui'
import ElectionCard from 'entities/postElection/ui'
import SuggestionCard from 'entities/postSuggestion/ui'
import MainContainer from '../../../widgets/mainContainer/ui'
import FloatingActionButton from 'shared/ui/floatingButton/ui'
import { useGetPostsQuery } from 'app/store/api/postApi'
import {$api} from 'shared/api'
import { BASE_URL } from 'shared/config/consts'

const Home = () => {
  // const {data: posts, error, isLoading} = useGetPostsQuery()
  const fetchData = async () => {
    const response = await $api.get(`${BASE_URL}/Posts/GetPosts`)
    // const res1 = await $api.get(`${BASE_URL}/Faculties/GetAllFaculties`)
    // console.log(res1.data)
    console.log(response.data)
  }
  fetchData()
  // console.log(posts)

  return (
    <div>
      <MainContainer>
        <ElectionCard />
        <SuggestionCard />
        <CommentCard />
        <FloatingActionButton />
      </MainContainer>
    </div>
  )
}

export default Home
