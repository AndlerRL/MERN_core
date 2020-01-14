import React from 'react';
import { NavLink } from 'react-router-dom';
import { Btn } from 'components/UI/btn';
import styled, { themeGet } from 'util/styles';
import { Box } from 'rebass';
import * as anim from 'util/animations';
import { Icons } from 'components/UI/icons';

const MERN = {
  M: styled.div`
    position: relative;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;

    p:not(span) {
      animation: 1s ${anim.transparent} cubic-bezier(0.6, 0.04, 0.98, 0.335) forwards 2000ms;
      color: #3F3E42;
      text-shadow: 0px 0px #E8E7D5,
        1px 1px #E8E7D5,
        2px 2px #E8E7D5,
        -1px -1px #E8E7D5,
        -2px -2px #E8E7D5,
        -1px 1px #E8E7D5,
        -2px 2px #E8E7D5,
        1px -1px #E8E7D5,
        2px -2px #E8E7D5,
        1px 0px #E8E7D5,
        2px 0px #E8E7D5,
        0px 1px #E8E7D5,
        0px 2px #E8E7D5,
        -1px 0px #E8E7D5,
        -2px 0px #E8E7D5,
        0px -1px #E8E7D5,
        0px -2px #E8E7D5;
    }

    span {
      z-index: 1;
      animation: 1.5s ${anim.fadeOutM} cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 3750ms;
      color: #3FA037;
      text-shadow: 0px 0px #4DB33D,
        1px 1px #4DB33D,
        2px 2px #4DB33D,
        -1px -1px #4DB33D,
        -2px -2px #4DB33D,
        -1px 1px #4DB33D,
        -2px 2px #4DB33D,
        1px -1px #4DB33D,
        2px -2px #4DB33D,
        1px 0px #4DB33D,
        2px 0px #4DB33D,
        0px 1px #4DB33D,
        0px 2px #4DB33D,
        -1px 0px #4DB33D,
        -2px 0px #4DB33D,
        0px -1px #4DB33D,
        0px -2px #4DB33D;
    }
  `,
  E: styled.div`
    position: relative;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;

    p:not(span) {
      animation: 1s ${anim.transparent} cubic-bezier(0.6, 0.04, 0.98, 0.335) forwards 2000ms;
      color: #68A063;
      text-shadow: 0px 0px #3C873A,
        1px 1px #3C873A,
        2px 2px #3C873A,
        -1px -1px #3C873A,
        -2px -2px #3C873A,
        -1px 1px #3C873A,
        -2px 2px #3C873A,
        1px -1px #3C873A,
        2px -2px #3C873A,
        1px 0px #3C873A,
        2px 0px #3C873A,
        0px 1px #3C873A,
        0px 2px #3C873A,
        -1px 0px #3C873A,
        -2px 0px #3C873A,
        0px -1px #3C873A,
        0px -2px #3C873A;
    }

    span {
      z-index: 1;
      animation: 1.5s ${anim.fadeOutE} cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 3750ms;
      color: #303030;
      text-shadow: 0px 0px #3C873A,
        1px 1px #3C873A,
        2px 2px #3C873A,
        -1px -1px #3C873A,
        -2px -2px #3C873A,
        -1px 1px #3C873A,
        -2px 2px #3C873A,
        1px -1px #3C873A,
        2px -2px #3C873A,
        1px 0px #3C873A,
        2px 0px #3C873A,
        0px 1px #3C873A,
        0px 2px #3C873A,
        -1px 0px #3C873A,
        -2px 0px #3C873A,
        0px -1px #3C873A,
        0px -2px #3C873A;
    }
  `,
  R: styled.div`
    position: relative;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;

    p:not(span) {
      animation: 1s ${anim.transparent} cubic-bezier(0.6, 0.04, 0.98, 0.335) forwards 2000ms;
      color: #424242;
      text-shadow: 0px 0px #61DBFB,
        1px 1px #61DBFB,
        2px 2px #61DBFB,
        -1px -1px #61DBFB,
        -2px -2px #61DBFB,
        -1px 1px #61DBFB,
        -2px 2px #61DBFB,
        1px -1px #61DBFB,
        2px -2px #61DBFB,
        1px 0px #61DBFB,
        2px 0px #61DBFB,
        0px 1px #61DBFB,
        0px 2px #61DBFB,
        -1px 0px #61DBFB,
        -2px 0px #61DBFB,
        0px -1px #61DBFB,
        0px -2px #61DBFB;
    }

    span {
      z-index: 1;
      animation: 1.5s ${anim.fadeOutR} cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 3750ms;
      color: #61DBFB;
      text-shadow: 0px 0px #424242,
        1px 1px #424242,
        2px 2px #424242,
        -1px -1px #424242,
        -2px -2px #424242,
        -1px 1px #424242,
        -2px 2px #424242,
        1px -1px #424242,
        2px -2px #424242,
        1px 0px #424242,
        2px 0px #424242,
        0px 1px #424242,
        0px 2px #424242,
        -1px 0px #424242,
        -2px 0px #424242,
        0px -1px #424242,
        0px -2px #424242;
    }
  `,
  N: styled.div`
    position: relative;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;

    p:not(span) {
      animation: 1s ${anim.transparent} cubic-bezier(0.6, 0.04, 0.98, 0.335) forwards 2000ms;
      color: #3C873A;
      text-shadow: 0px 0px #68A063,
        1px 1px #68A063,
        2px 2px #68A063,
        -1px -1px #68A063,
        -2px -2px #68A063,
        -1px 1px #68A063,
        -2px 2px #68A063,
        1px -1px #68A063,
        2px -2px #68A063,
        1px 0px #68A063,
        2px 0px #68A063,
        0px 1px #68A063,
        0px 2px #68A063,
        -1px 0px #68A063,
        -2px 0px #68A063,
        0px -1px #68A063,
        0px -2px #68A063;
    }

    span {
      z-index: 1;
      animation: 1.5s ${anim.fadeOutN} cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 3750ms;
      color: #303030;
      text-shadow: 0px 0px #68A063,
        1px 1px #68A063,
        2px 2px #68A063,
        -1px -1px #68A063,
        -2px -2px #68A063,
        -1px 1px #68A063,
        -2px 2px #68A063,
        1px -1px #68A063,
        2px -2px #68A063,
        1px 0px #68A063,
        2px 0px #68A063,
        0px 1px #68A063,
        0px 2px #68A063,
        -1px 0px #68A063,
        -2px 0px #68A063,
        0px -1px #68A063,
        0px -2px #68A063;
    }
  `
};

const Stack = styled.div`
  font-style: oblique;
  font-family: cursive;
  letter-spacing: 8px;
  font-weight: 200 !important;
`;

const HeadContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 100%;
  min-height: 100vh;
  background-color: #222;
  position: relative;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    > div {
      position: relative;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      align-content: center;
      width: 100%;
      color: #f5f5f5;
      font-size: 48px;
      font-weight: bolder;
      line-height: 2;
      letter-spacing: 5px;
      text-align: center;
      
      > div{
        span {
          font-size: 96px;
        }
      }
    }
  }

  .FadeInRight {
    animation: 0.5s ${anim.slideAnimation} forwards;

    &.DelayE {
      opacity: 0;
      animation-delay: 500ms;
    }

    &.DelayR {
      opacity: 0;
      animation-delay: 1000ms;
    }

    &.DelayN {
      opacity: 0;
      animation-delay: 1500ms;
    }
  }

  .ZoomIn {
    animation: 2.5s ${anim.zoomInAnimation} forwards;

    &.DelayStack {
      opacity: 0;
      animation-delay: 2500ms;
    }
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  min-height: 100vh;
`;

const Home = () => {
  const moreOptHandler = () => {
    window.scroll({
      left: 0,
      top: window.innerHeight - 64,
      behavior: 'smooth'
    });
  };

  return (
    <div>
      <HeadContainer>
        <div>
          <div>
            <MERN.M className="FadeInRight">
              <p><span>M</span>ongo</p>
            </MERN.M>
            <MERN.E className="FadeInRight DelayE">
              <p><span>E</span>xpress</p>
            </MERN.E>
            <MERN.R className="FadeInRight DelayR">
              <p><span>R</span>eact</p>
            </MERN.R>
            <MERN.N className="FadeInRight DelayN">
              <p><span>N</span>ode</p>
            </MERN.N>
          </div>
          <Box as="hr" width={10 / 12} 
            mx="auto"
            className="ZoomIn DelayStack" 
            style={{
              border: 0,
              height: '1px',
              backgroundImage: 'linear-gradient(to right, rgba(245, 245, 245, 0), rgba(245, 245, 245, 0.75), rgba(245, 245, 245, 0))'
            }}
          />
          <Stack className="ZoomIn DelayStack">Stack</Stack>
        </div>
        <Btn.Primary style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}
        onClick={moreOptHandler}
        >
          <Icons.ArrowDown fontSize="large" />
        </Btn.Primary>
      </HeadContainer>
      <MainContainer>
        <Btn.Secondary>
          <NavLink to="/posts">
            Go to Posts
          </NavLink>
        </Btn.Secondary>
        <Btn.Secondary>
          <NavLink to="/admin/new-post">
            Create New Post
          </NavLink>
        </Btn.Secondary>
      </MainContainer>
    </div>
  );
};

export default Home;
