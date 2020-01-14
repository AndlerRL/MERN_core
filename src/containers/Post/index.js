import React, { useState, useEffect } from 'react';
import { Flex, Text } from 'rebass';
import { Card, CardActions, CardContent, Typography, Paper } from '@material-ui/core';
import { Btn } from 'components/UI/btn';
import styled, { themeGet } from 'util/styles';
import apiService from 'services/apiService';

const Post = styled(Card)`
  width: 91.666%;
  max-width: 600px;
  box-shadow: ${themeGet('shadows.d2.0')},
    ${themeGet('shadows.d2.1')},
    ${themeGet('shadows.d2.2')};
  margin: 2rem auto;
`;

const Topic = styled(Paper)`
  font-size: ${themeGet('fontSizes.1')}px;
  margin: 2rem 1rem 0 0;
  padding: ${themeGet('space.2')}px;
  box-shadow: ${themeGet('shadows.d1.0')},
    ${themeGet('shadows.d1.1')},
    ${themeGet('shadows.d1.2')};
`;

const PostContainer = () => {
  const [posts, setPosts] = useState([]);

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

  return (
    <Flex
      flexDirection="column"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="flex-start"
      width={1}
      pt={6}
    >
      {posts.length > 0 && <Text as="h1">Posts on! Total Posts: {posts.length}</Text>}
      {posts.map(p => (
        <Post
          key={p.id}
          my={4}
          variant="outlined"
        >
          <CardContent>
            <Typography component="span" color="textSecondary" variant="body2" gutterBottom>
              written by {p.author || `${p.first} ${p.last}`}
            </Typography>
            <Typography component="p" color="textSecondary" variant="body1">
              {p.text}
            </Typography>
            <Flex
              alignItems="center"
              justifyContent="flex-start"
              flexWrap="wrap"
            >
              {p.topics.map((t, i) => (
                <Topic 
                  elevation={3}
                  variant="outlined"
                  key={i}
                >
                  {t}
                </Topic>
              ))}
            </Flex>
          </CardContent>
          <CardActions>
            <Btn.Primary size="small">
              Show more
            </Btn.Primary>
          </CardActions>
        </Post>
      ))}
    </Flex>
  );
};

export default PostContainer;
