import CommentCard from 'components/post/Comment'
import ElectionCard from 'components/post/Election'
import SuggestionCard from 'components/post/Suggestion'
import MainContainer from '../../widgets/mainContainer'
import { useGetPostsQuery } from 'app/store/api/postApi'
import { $api } from 'shared/api'
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
      </MainContainer>
    </div>
  )
}

export default Home
