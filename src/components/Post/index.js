import React from 'react';
import PropTypes from 'prop-types';
import styled, { themeGet } from 'util/styles';
import { Flex, Text } from 'rebass';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Paper,
  CardMedia
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const PostContainer = styled(Card)`
  padding-bottom: ${themeGet('space.7')}px !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  .MuiTypography-h3 {
    padding: 32px 0;
  }
`;

const PostInnerContainer = styled(CardContent)`
  width: 91.666%;
  max-width: 52em;
  padding: 32px 0;
  white-space: pre-line;
`;

const Topic = styled(Paper)`
  font-size: ${themeGet('fontSizes.1')}px;
  margin: 1rem 1rem 0 0;
  padding: ${themeGet('space.2')}px;
  background-color: ${themeGet('colors.secondary.100')} !important;
  box-shadow: ${themeGet('shadows.d1.0')},
    ${themeGet('shadows.d1.1')},
    ${themeGet('shadows.d1.2')};
`;

const CardImg = styled(CardMedia)`
  height: ${({ fullwidth }) => (fullwidth ? '66.66vh' : '33.33vh')};
  width: ${({ fullwidth }) => (fullwidth ? '100%' : '83.333%')} !important;
`;

const PostFooter = styled(CardActions)`
  width: 91.666%;
  max-width: 52em;
  margin-top: ${themeGet('space.6')}px;
`;

const UserLink = styled(Typography)`
  color: ${themeGet('colors.primary.300')};
  cursor: pointer;
  transition: transform 0.15s cubic-bezier(0.785, 0.135, 0.15, 0.86),
    letter-spacing 0.25s linear;

  &:hover {
    transform: scale(1.02);
    letter-spacing: 2px;
  }
`;

const Post = ({ post, userClick }) => {
  const { t } = useTranslation();

  const publishAt = new Date(post.modifiedAt).toDateString();

  return (
    <PostContainer>
      {post.content.map((c, i) => (
        <React.Fragment
          key={i}
        >
          <CardImg
            component="img"
            alt="img-head"
            image={c.imgContent}
            fullwidth={(i === 0).toString()}
          />
          {i === 0 && (
            <Typography 
              gutterBottom
              variant="h3"
              component="h1"
            >
              {(post.title).toUpperCase()}
            </Typography>
          )}
          <PostInnerContainer>
            <Typography
              variant="body1"
            >
              {c.content}
            </Typography>
          </PostInnerContainer>
        </React.Fragment>
      ))}
      <PostInnerContainer>
        <Flex
          alignItems="center"
          justifyContent="flex-start"
          flexWrap="wrap"
        >
          {post.topics.map((t, i) => (
            <Topic key={i}>
              #{t}
            </Topic>
          ))}
        </Flex>
      </PostInnerContainer>
      <PostFooter>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          width={1}
        >
          <Typography
            component="span"
            variant="caption"
          >
            {t('post.author')}
            <UserLink
              component="span"
              variant="body2"
              onClick={() => userClick(post.authorId)}
            >
              {post.author}
            </UserLink>
          </Typography>
          <Typography
            component="span"
            variant="caption"
            style={{
              color: '#009688'
            }}
          >
            {t('post.publish') + publishAt}
          </Typography>
        </Flex>
      </PostFooter>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  userClick: PropTypes.func.isRequired
};

export default Post;
