import React, { useState, useEffect } from 'react';
import PropType from 'prop-types';
import { Flex } from 'rebass';
import styled, { themeGet } from 'util/styles';
import apiService from 'services/apiService';
import PostList from 'components/PostList';
import AOS from 'aos';

const Filters = styled(Flex)`
  height: 33.33vh;
  width: 100%;
  background-color: #222;
  color: #f5f5f5;
`;

const PostContainer = ({ history, match }) => {
  const [dbLength, setDbLength] = useState(0);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    AOS.init({
      easing: 'ease-in-cubic',
      delay: 50,
      anchorPlacement: 'bottom-top',
      duration: 1,
      once: true,
      mirror: true
    });

    db();
    fetchPost();

    return () => {
      AOS.refresh();
    };
  }, []);

  const db = async () => {
    try {
      const res = await apiService.getPosts();
      const { length } = res.data;

      setDbLength(length);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPost = async () => {
    if (posts.length >= dbLength && posts.length > 0) {
      setHasMore(false);
      return;
    }

    const postsLength = posts.length || 1;

    try {
      await apiService.getPosts(postsLength, 5)
        .then(res => {
          const newPosts = res.data;

          setPosts([...posts, ...newPosts]);
        })
        .catch(err => {
          console.log(err);
        });
    }
    catch (err) {
      console.error(err);
    }
  };

  const postHandler = id => {
    const queryString = `${encodeURIComponent('id')}=${encodeURIComponent(id)}`;

    history.push({
      pathname: `${match.path}/post`,
      search: `?${queryString}`
    });
  };

  return (
    <React.Fragment>
      <Filters
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        Filters
      </Filters>
      <PostList
        posts={posts}
        hasMore={hasMore}
        fetchPost={fetchPost}
        clicked={postHandler}
      />
    </React.Fragment>
  );
};

PostContainer.propTypes = {
  history: PropType.object,
  match: PropType.object,
};

export default PostContainer;
