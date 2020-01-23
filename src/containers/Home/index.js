import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Btn } from 'components/UI/btn';
import styled, { themeGet } from 'util/styles';
import { Box, Flex } from 'rebass';
import * as anim from 'util/animations';
import { Icons } from 'components/UI/icons';
import { motion, useCycle, useAnimation } from 'framer-motion';
import Mern from 'components/UI/mern';
import Tooltip from 'components/UI/tooltip';

const move = i => {
  const { innerWidth } = window;

  if (innerWidth >= 920) {
    if (i === 0)
      return 800 - 550;
  
    if (i === 1)
      return 800 - 660;
  
    if (i === 2)
      return 800 - 815;
  
    if (i === 3)
      return 800 - 955;
  }

  if (innerWidth <= 919 && innerWidth >= 830) {
    if (i === 0)
      return 800 - 570;
  
    if (i === 1)
      return 800 - 665;
  
    if (i === 2)
      return 800 - 810;
  
    if (i === 3)
      return 800 - 935;
  }

  if (innerWidth <= 829 && innerWidth >= 740) {
    if (i === 0)
      return 800 - 600;
  
    if (i === 1)
      return 800 - 675;
  
    if (i === 2)
      return 0;
  
    if (i === 3)
      return 800 - 905;
  }

  if (innerWidth <= 749 && innerWidth >= 500) {
    if (i === 0)
      return innerWidth * 0.5;
  
    if (i === 1)
      return innerWidth * 0.25;
  
    if (i === 2)
      return innerWidth * 0.16;
  
    if (i === 3)
      return innerWidth * 0.8;
  }
};

const capitalVariants = {
  initial: {
    x: 0
  },
  move: i => ({
    x: move(i)
  })
};

const variants = {
  visible: i => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.5
    },
  }),
  hidden: { 
    opacity: 0,
    scale: 0.1
  },
};

const MERNVariants = {
  hidden: {
    x: 1000,
    opacity: 0
  },
  visible: i => ({
    x: 0,
    opacity: 1,
    transition: {
      ease: 'easeOut',
      delay: i * 0.3
    }
  })
};

const itemVariants = {
  hide: {
    opacity: 0,
    textShadow: 'transparent',
  },
  show: {
    opacity: 1,
  }
};

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;

  & > .PostInfo {
    align-items: center;
  }
`;

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
  width: 100%;
  min-height: 100vh;
  max-width: 1200px;

  .PostInfo {
    background: url(/assets/images/read-blog.jpg) no-repeat;
    background-size: cover;
    background-position: center center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > div {
      width: 100%;
      direction: rtl;
      padding: 32px;
      background: radial-gradient(#fff8 10%,#fff1 90%);
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 1;

      @media screen and (min-width: 600px) {
        flex-direction: row;

        li {
          text-align: right;
        }

        > div {
          justify-content: flex-end;
        }
      }

      > ul,
      > div {
        width: 100%;
        max-width: 600px;
      }

      ul {
        margin: 0;
        padding: 0;

        li {
          font-size: 16px;
          font-weight: 400;
          margin: 0.75rem auto;
          list-style: none;
          text-align: center;
        }
      }

      > div {
        display: flex;
        align-items: center;
        justify-content: center;

        @media screen and (min-width: 600px) {
          justify-content: flex-end;
        }

        > button {
          padding: 16px;
        }
      }
        
    }
  }

  .NewPostInfo {
    background: url(/assets/images/create-blog.jpg) no-repeat;
    background-size: 44% cover;
    background-position: right center;
    padding: 62px;
  }

  .FramerMotion {
    background-color: red;
    box-shadow: 5px 5px 20px 5px #2225;
    width: 83.333%;
    height: 100%;
    max-width: 400px;
    max-height: 400px;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    padding: 32px;

    li {
      font-size: 13px;
      font-weight: 300;
      margin: 0.5rem auto;
      list-style: none;
    }
  }
`;

const Home = (props, ref) => {
  const [list, setList] = useState(false);
  const [post, setPost] = useState(false);
  const [newPost, setNewPost] = useState(false);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [anim, cycle] = useCycle({
    borderRadius: '1000%',
    opacity: 0.5,
    scale: 0.5,
    rotate: 90,
  },{
    borderRadius: '25%',
    opacity: 1,
    scale: 1,
    rotate: 0,
  });
  const [newPostInfoAnim, newPostInfoCycle] = useCycle({
    borderRadius: '100%',
    scale: 0.7,
    x: '-50vw',
    cursor: 'pointer',
    alignItems: 'center',
  },{
    borderRadius: 0,
    scale: 1,
    x: 0,
    alignItems: innerWidth < 770 ? 'center' : 'flex-end',
  });
  const controlPostAnim = useAnimation();

  useEffect(() => {
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  const resize = () => {
    if (window.innerWidth !== innerWidth)
      setInnerWidth(window.innerWidth);
  };

  const moreOptHandler = () => {
    window.scroll({
      left: 0,
      top: window.innerHeight - 64,
      behavior: 'smooth'
    });
  };

  const activeAnim = component => {
    if (component === 'list')
      setList(!list);

    if (component === 'post') {
      setPost(true);
      
      controlPostAnim.start({
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        alignItems: innerWidth < 770 ? 'center' : 'flex-end',
        width: '100%',
        height: '100%',
        cursor: 'initial'
      });
    }

    if (component === 'newPost')
      setNewPost(!newPost);
  };


  const items = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu quam in sapien accumsan pulvinar at ac lacus.',
    'Etiam eget luctus elit. Vestibulum non sodales ante, ut efficitur erat.',
    'Aliquam faucibus, tellus nec vehicula feugiat, magna felis malesuada quam, laoreet fringilla justo felis non elit.',
    'Sed non gravida dui. Mauris ligula velit, porta ac finibus sed, facilisis quis orci.',
    'Morbi a dui non elit dapibus aliquet. Nunc efficitur sagittis venenatis.',
    'Donec feugiat dignissim mauris, a tincidunt enim. Maecenas auctor massa massa, nec rutrum orci sagittis et.'
  ];

  const MERN = [
    'Mongo',
    'Express',
    'React',
    'Node'
  ];

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      width={1}
    >
      <HeadContainer>
        <div>
          <div>
            <Mern>
              {MERN.map((i, k) => (
                <motion.div
                  key={k}
                  custom={k}
                  animate="visible"
                  initial="hidden"
                  variants={MERNVariants}
                >
                  <motion.span
                    custom={k}
                    animate="move"
                    initial="initial"
                    variants={capitalVariants}
                    transition={{
                      ease: 'backIn',
                      duration: 1,
                      delay: 1.75
                    }}
                  >
                    {i.substring(0, 1)}
                  </motion.span>
                  <motion.span
                    animate="hide"
                    initial="show"
                    variants={itemVariants}
                    transition={{
                      delay: 1.5
                    }}
                  >
                    {i.substring(1, i.length)}
                  </motion.span>
                </motion.div>
              ))}
            </Mern>
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
        <ContentContainer>
          <Tooltip
            text="Click Me!"
            visible={list}
            initial={null}
            animate={anim}
            onTap={() => cycle()}
            whileHover={{ opacity: !list ? anim.opacity + 0.2 : 1 }}
            clicked={() => activeAnim('list')}
            className="FramerMotion"
          >
            {list ? 
              items.map((item, i) => (
                <motion.li
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={variants}
                >
                  {item}
                </motion.li>
              )) : 
              <motion.span
                animate={{
                  opacity: list ? 0 : 1,
                }}
              >
                <Icons.Add fontSize="large" style={{ transform: 'scale(2)', color: '#222' }} />
              </motion.span>}
          </Tooltip>
        </ContentContainer>
        <Box as="hr" width={1} 
          mx="auto"
          className="ZoomIn DelayStack" 
          style={{
            border: 0,
            height: '1px',
            backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))'
          }}
          my={6}
        />
        <ContentContainer>
          <Tooltip
            text="Click for More"
            visible={post}
            anchorPos="LEFT_CENTER"
            initial={{
              borderTopLeftRadius: '100px',
              borderBottomLeftRadius: '100px',
              cursor: 'pointer',
              alignItems: 'center',
              width: '50%',
              height: '50%'
            }}
            animate={controlPostAnim}
            whileTap={{ opacity: !post && 0.8 }}
            transition={{
              ease: 'backIn',
              duration: .5
            }}
            className="PostInfo"
            clicked={() => activeAnim('post')}
          >
            {post ?
              <div>
                <ul>
                  {items.map((item, i) => (
                    <motion.li
                      key={i}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={variants}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
                <motion.div
                  custom={8}
                  initial="hidden"
                  animate="visible"
                  variants={variants}
                >
                  <Btn.Secondary variant="contained" size="large">
                    <NavLink to="/posts">
                      Go To Posts
                    </NavLink>
                  </Btn.Secondary>
                </motion.div>
              </div> :
              <motion.span
                animate={{
                  opacity: post ? 0 : 1,
                }}
              >
                <Icons.Add fontSize="large" style={{ transform: 'scale(2)', color: '#222' }} />
              </motion.span>}
          </Tooltip>
        </ContentContainer>
        <Box as="hr" width={1} 
          mx="auto"
          className="ZoomIn DelayStack" 
          style={{
            border: 0,
            height: '1px',
            backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))'
          }}
          my={6}
        />
        <ContentContainer>
          <Tooltip
            text="Click for More"
            visible={newPost}
            anchorPos="RIGHT_CENTER"
            initial={{
              borderTopRightRadius: '100px',
              borderBottomRightRadius: '100px',
              cursor: 'pointer',
              alignItems: 'center',
            }}
            animate={newPostInfoAnim}
            onTap={() => newPostInfoCycle()}
            whileTap={{ opacity: !newPost && 0.8 }}
            transition={{
              ease: 'backIn',
              duration: .5
            }}
            className="NewPostInfo"
            clicked={() => activeAnim('newPost')}
          >
            {newPost ?
              <div>
                {items.map((item, i) => (
                  <motion.li
                    key={i}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={variants}
                  >
                    {item}
                  </motion.li>
                ))}
                <motion.div
                  custom={8}
                  initial="hidden"
                  animate="visible"
                  variants={variants}
                >
                  <Btn.Secondary>
                    <NavLink to="/admin/new-post">
                      Create New Post
                    </NavLink>
                  </Btn.Secondary>
                </motion.div>
              </div> :
              <motion.span
                animate={{
                  opacity: newPost ? 0 : 1,
                }}
                style={{
                  marginRight: '-33.33%'
                }}
              >
                <Icons.Add fontSize="large" style={{ transform: 'scale(2)', color: '#222' }} />
              </motion.span>}
          </Tooltip>
        </ContentContainer>
      </MainContainer>
    </Flex>
  );
};

export default Home;
