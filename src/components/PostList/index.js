import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Text } from 'rebass';
import { Card, CardActions, CardContent, Typography, Paper, CardMedia } from '@material-ui/core';
import { Btn } from 'components/UI/btn';
import PostSkeleton from 'components/UI/skeletons/post';
import InfiniteScroll from 'react-infinite-scroll-component';
import EndPost from 'components/UI/noContent';
import styled, { themeGet } from 'util/styles';

const Post = styled(Card)`
  width: 91.666%;
  max-width: 750px;
  min-height: 500px;
  max-height: auto;
  box-shadow: ${themeGet('shadows.d2.0')},
    ${themeGet('shadows.d2.1')},
    ${themeGet('shadows.d2.2')};
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media screen and (min-width: 600px) {
    flex-direction: row;
    min-height: 250px;
    max-height: 250px;
  }

  > div.MuiCardMedia-root {
    min-width: 100%;
    max-width: 100%;
    height: 250px;

    @media screen and (min-width: 600px) {
      min-width: 33.33%;
      max-width: 250px;
    }
  }

  > div.MuiCardContent-root {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    min-height: 250px;
    max-height: auto;
    width: 100%;
    background-color: ${themeGet('colors.primary.50')};
    padding: 16px;

    span {
      min-height: 25px;
    }

    p {
      min-height: 75px;
    }

    div.MuiCardActions-root {
      min-height: 50px;
      padding: 0;
    }

    @media screen and (min-width: 600px) {
      max-height: 250px;
    }
  }
`;

const Topic = styled(Paper)`
  font-size: ${themeGet('fontSizes.1')}px;
  margin: auto 1rem 0 auto;
  padding: ${themeGet('space.2')}px;
  background-color: ${themeGet('colors.secondary.100')} !important;
  box-shadow: ${themeGet('shadows.d1.0')},
    ${themeGet('shadows.d1.1')},
    ${themeGet('shadows.d1.2')};
`;

const PostList = ({ posts, fetchPost, hasMore }) => (
  <InfiniteScroll
    dataLength={posts && posts.length}
    next={fetchPost}
    hasMore={hasMore}
    loader={<PostSkeleton />}
    endMessage={<EndPost />}
  >
    <Flex
      flexDirection="column"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="flex-start"
      width={1}
      pt={6}
    >
      {posts.length > 0 && <Text as="h1">Posts on! Total Posts: {posts.length}</Text>}
      {posts.map((p, i) => (
        <Post 
          key={p.id}
          variant="outlined"
          data-aos="zoom-in-up"
        >
          <CardMedia
            image={`https://via.placeholder.com/260x260/212121/F5F5F5/?text=${`${p.first}+${p.last}`}+Image`}
            title="User Image"
          />
          <CardContent>
            <Typography component="span" color="textSecondary" variant="body2" gutterBottom>
              written by {p.author || `${p.first} ${p.last}`}
            </Typography>
            <Typography component="p" color="textSecondary" variant="body1" style={{ whiteSpace: 'pre-line' }}>
              {`${p.text && (p.text).substring(0, 100)} …` || `${p.content && (p.content).substring(0, 100)} …`}
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
            <CardActions>
              <Btn.Secondary>
                Show more
              </Btn.Secondary>
            </CardActions>
          </CardContent>
        </Post>
      ))}
    </Flex>
  </InfiniteScroll>
);

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  hasMore: PropTypes.bool.isRequired,
  fetchPost: PropTypes.func.isRequired
};

export default PostList;
