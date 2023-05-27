import Post from "components/post";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { GetPosts } from "shared/lib/postsRequests";
import { IPost } from "shared/model/Types";
import MainContainer from "widgets/mainContainer";

const Posts = () => {
  const [posts, setPosts] = useState<IPost[]>();

  const fetchPosts = async () => {
    const response = await GetPosts();
    setPosts(response.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <MainContainer>
      {posts
        ?.map((post) => (
          <Post fetchPosts={fetchPosts} key={post.id} post={post} />
        ))
        .reverse()}
    </MainContainer>
  );
};

export default Posts;
