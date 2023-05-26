import Post from "components/post";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { GetPosts } from "shared/lib/postsRequests";
import { IPost } from "shared/model/Types";
import MainContainer from "widgets/mainContainer";

const Posts = () => {
  const [posts, setPosts] = useState<IPost[]>();

  const fetchData = async () => {
    const response = await GetPosts();
    setPosts(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MainContainer>
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </MainContainer>
  );
};

export default Posts;
