import React from 'react';
import styled from 'util/styles';
import { Flex, Text } from 'rebass';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Paper,
  CardMedia
} from '@material-ui/core';

const Post = ({ post }) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardMedia
        component="img"
        alt="img-head"
        image={post.content[0].imgContent}
      />
      <CardContent>
        <Typography 
          gutterBottom
          variant="h3"
          component="h1"
        >
          {post.title}
        </Typography>
        <Typography
          variant="body1"
        >
          {post.content[0].content}
        </Typography>
      </CardContent>
      {post.content.map((c, i) => i >= 2 && (
        <React.Fragment>
          <CardMedia
            component="img"
            alt="img-head"
            image={c.imgContent}
          />
          <CardContent>
            <Typography
              variant="body1"
            >
              {c.content}
            </Typography>
          </CardContent>
        </React.Fragment>
      ))}
      <CardContent>
        <Typography
          variant="body2"
        >
          {post.topics.map((t, i) => (
            <Flex
              alignItems="center"
              justifyContent="flex-start"
              flexWrap="wrap"
              width={10 / 12}
              key={i}
            >
              <Paper>
                {t}
              </Paper>
            </Flex>
          ))}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
