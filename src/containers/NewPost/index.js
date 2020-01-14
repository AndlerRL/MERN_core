import React, { useState } from 'react';
import PostForm from 'components/PostForm';
import apiService from 'services/apiService';
import { Flex } from 'rebass';

const NewPost = () => {
  const [posts, setPosts] = useState([]);
  const [postVal, setPostVal] = useState(undefined);
  const [submitting, setSubmitting] = useState(false);

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

    setPosts(newPosts);
    setSubmitting(false);
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="flex-start"
      pt={6}
      width={1}
    >
      <PostForm value={postVal} submitting={submitting} onChange={changeHandler} onSubmit={submitHandler} />
    </Flex>
  );
};

export default NewPost;
