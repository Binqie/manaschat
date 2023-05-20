import { useEffect } from 'react'
import CommentCard from 'components/post/Comment'
import ElectionCard from 'components/post/Election'
import SuggestionCard from 'components/post/Suggestion'
import MainContainer from 'widgets/mainContainer'

import { $api } from 'shared/api'
import { BASE_URL } from 'shared/config/consts'
import { IPost, PostTypesEnum } from 'shared/model/Types'

import { setPosts } from 'app/store/slices/PostSlice'
import { useAppDispatch, useAppSelector } from 'shared/hooks'

const Home = () => {
  const dispatch = useAppDispatch()
  const posts = useAppSelector((store) => store.posts.posts)

  const fetchData = async () => {
    const response = await $api.get(`${BASE_URL}/Posts/GetPosts`)
    dispatch(setPosts(response.data))
    console.log(response.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const renderPosts = () => {
    return posts?.map((post: IPost) => {
      if (post.type === PostTypesEnum.COMMENT) {
        return (
          <CommentCard
            post={post}
            key={post.id}
          />
        )
      } else if (post.type === PostTypesEnum.SUGGESTION) {
        return (
          <SuggestionCard
            post={post}
            key={post.id}
          />
        )
      } else {
        return (
          <ElectionCard
            post={post}
            key={post.id}
          />
        )
      }
    })
  }

  return (
    <div>
      <MainContainer>{renderPosts()}</MainContainer>
    </div>
  )
}

export default Home
