/* eslint-disable react/display-name */
import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import apiService from 'services/apiService';
import PostItem from 'components/Post';

const Post = React.memo(({ history, location }) => {
  const [post, setPost] = useState(null);

  const getPost = useCallback(id => {
    if (id === 0)
      return;

    apiService.getPost(id)
      .then(res => {
        console.log(res);
        setPost(res.data);
      });
  }, [setPost]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    let postId = 0;

    for (const param of query.entries()) {
      if (param[0] === 'id')
        postId = param[1];
    }

    console.log(postId);

    getPost(postId);
  }, [getPost]);

  const toUserProfileHandler = id => {
    console.log(id);
    const queryString = `${encodeURIComponent('id')}=${encodeURIComponent(id)}`;

    history.push({
      pathname: '/user',
      search: `?${queryString}`
    });
  };

  return post && (
    <PostItem 
      post={post}
      userClick={toUserProfileHandler}
    />
  );
});

Post.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
};

export default Post;
