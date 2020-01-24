import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styled, { themeGet } from 'util/styles';

const Post = styled.div`
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

  > div.img {
    min-width: 100%;
    max-width: 100%;
    height: 250px;
    background-color: #222;

    @media screen and (min-width: 600px) {
      min-width: 33.33%;
      max-width: 250px;
    }
  }

  > div.content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    height: 250px;
    width: 100%;
    background-color: ${themeGet('colors.primary.50')};
    padding: 16px;

    > span {
      min-height: 25px;
      width: 45%;

      span {
        width: 100%;
        height: 0.875rem;
      }
    }

    p {
      min-height: 75px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      width: 100%;

      span {
        width: 100%;
        height: 1rem;

        > span {
          &:last-child {
            width: 75%;
          }
        }
      }
    }

    div.topics {
      min-height: 40px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;

      span {
        margin-right: 1rem;
      }
    }

    div.actions {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      min-height: 50px;
    }
  }
`;

const post = () => (
  <Post>
    <div className="img" />
    <div className="content">
      <span>
        <Skeleton count={1} />
      </span>
      <p>
        <Skeleton count={3} />
      </p>
      <div className="topics">
        <Skeleton width={80} height={37} count={3} />
      </div>
      <div className="actions">
        <Skeleton width={110} height={41} count={1} />
      </div>
    </div>
  </Post>
);

export default post;
