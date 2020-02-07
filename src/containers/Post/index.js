import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import apiService from 'services/apiService';
import PostItem from 'components/Post';

const Post = ({ history, location }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    let postId = 0;

    for (const param of query.entries()) {
      if (param[0] === 'id')
        postId = param[1];
    }

    console.log(postId);
    apiService.getPost(postId)
      .then(res => {
        console.log(res);
        setPost(res.data);
      });
  }, []);

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
};

Post.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
};

export default Post;
