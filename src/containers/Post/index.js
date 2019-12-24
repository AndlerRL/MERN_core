import React, { useState, useEffect } from 'react';
import { Flex, Text } from 'rebass';
import PostForm from 'components/PostForm';
import apiService from 'services/apiService';

const PostContainer = () => {
  const [posts, setPosts] = useState([]);
  const [postVal, setPostVal] = useState(undefined);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiService.getPosts();
        const posts = res.data;

        setPosts(posts);
      }
      catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const changeHandler = postVal => {
    setPostVal(postVal);
  };

  const submitHandler = async e => {
    e.preventDefault();

    setSubmitting(true);
    setPostVal(undefined);

    e.persist();

    const res = await apiService.createPost(postVal);
    const newPosts = [...posts, res.data];

    e.target.reset();

    setSubmitting(false);
    setPosts(newPosts);
  };

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      width={1}
    >
      {posts.length > 0 && <Text as="h1">Posts on!</Text>}
      <PostForm value={postVal} submitting={submitting} onChange={changeHandler} onSubmit={submitHandler} />
    </Flex>
  );
};

export default PostContainer;
