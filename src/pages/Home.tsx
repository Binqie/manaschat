import CommentCard from '../components/Post/CommentPost'
import ElectionCard from '../components/Post/ElectionPost'
import SuggestionCard from '../components/Post/SuggestionPost'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import MainContainer from '../containers/MainContainer'

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
