import React, { useState, useEffect, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { Btn } from 'components/UI/btn';
import { useTranslation } from 'react-i18next';
import styled from 'util/styles';
import { Box, Flex } from 'rebass';
import * as anim from 'util/animations';
import { Icons } from 'components/UI/icons';
import { motion, useCycle, useAnimation } from 'framer-motion';
import Mern from 'components/UI/mern';
import Tooltip from 'components/UI/tooltip';
import useIO from 'hooks/useIO';
import { AuthContext } from 'context/auth-context';

const variants = {
  visible: i => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: (i * 0.5) + 0.5
    },
  }),
  hidden: { 
    opacity: 0,
    scale: 0.1
  },
};

const ContentContainer = styled(Flex)`
  width: 100%;
  max-width: 1200px;
  height: 75vh;
  flex-direction: column;
  justify-content: center;
  position: relative;

  .Title {
    position: absolute;
    top: -108px;
    width: 100%;
    text-align: center;
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
      padding: 32px;
      background: radial-gradient(#fff6 10%,#fff4 90%);
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
    background-size: cover;
    background-position: center center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > div {
      width: 100%;
      padding: 32px;
      background: radial-gradient(#fff6 10%,#fff4 90%);
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

const Home = ({ history }) => {
  const { t } = useTranslation();
  const [list, setList] = useState(false);
  const [post, setPost] = useState(false);
  const [newPost, setNewPost] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [anim, cycle] = useCycle({
    borderRadius: '250px',
    opacity: 0.5,
    scale: 0.5,
    rotate: 90,
  },{
    borderRadius: '25%',
    opacity: 1,
    scale: 1,
    rotate: 0,
  });
  const IOComponentAnim = useAnimation();
  const controlPostAnim = useAnimation();
  const controlNewPostAnim = useAnimation();
  const [observer, setElements, entries] = useIO({
    threshold: [0.5],
    root: null
  });
  const authContext = useContext(AuthContext);
  const { isAuth, authRedirectPath } = authContext;

  const resize = useCallback(
    () => {
      const { innerWidth } = window;
      if (innerWidth !== width)
        setWidth(innerWidth);
    },
    [width]
  );

  useEffect(() => {
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [resize]);

  useEffect(() => {
    const IOComponents = Array.from(document.querySelectorAll('#IOContent'));
    
    setElements(IOComponents);
  }, [setElements]);

  useEffect(() => {
    entries.forEach(entry => {
      const { isIntersecting, target } = entry;

      /**
       * 
       * 
       * 
       * 
       * 
       * Lo que podría hacer aquí es crear un state,
       * en donde se actualize
       * cuando el componente esté en el viewport,
       * usar ése state, para poder
       * realizar un interpolate conditional, 
       * en donde cambie tipo de 
       * ejecución de animación y así no tener el
       * problema del looping
       * animate que está causando y hace que
       * la aplicación corra lento.
       * 
       * Se puede usar useAnimation() Hook y el useCycle() Hook
       * 
       * 
       * 
       * 
       * 
       */
      
      if (isIntersecting) {
        IOComponentAnim.start({
          borderRadius: '100%',
          opacity: 0.5,
          scale: 0.5,
          transition: {
            duration: 0.25
          }
        });
        observer.unobserve(target);
      } else {
        IOComponentAnim.start({
          borderRadius: '100%',
          opacity: 0,
          scale: 0.25,
          transition: {
            duration: 0.25
          }
        });
        observer.unobserve(target);
      }
    });
  }, [entries, observer]);

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
        alignItems: width < 770 ? 'center' : 'flex-end',
        width: '100%',
        height: '100%',
        cursor: 'initial'
      });
    }

    if (component === 'newPost') {
      setNewPost(true);

      controlNewPostAnim.start({
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        alignItems: width < 770 ? 'center' : 'flex-start',
        width: '100%',
        height: '100%',
        cursor: 'initial'
      });
    }
  };

  const goToPathHandler = route => {
    if (route === 'posts')
      history.push('/posts');

    if (route === 'create') {
      if (isAuth) {
        history.push('/admin/new-post');
      } else {
        authRedirectPath('/admin/new-post');

        history.push('/login');
      }
    }
  };

  const items = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu quam in sapien accumsan pulvinar at ac lacus.',
    'Etiam eget luctus elit. Vestibulum non sodales ante, ut efficitur erat.',
    'Aliquam faucibus, tellus nec vehicula feugiat, magna felis malesuada quam, laoreet fringilla justo felis non elit.',
    'Sed non gravida dui. Mauris ligula velit, porta ac finibus sed, facilisis quis orci.',
    'Morbi a dui non elit dapibus aliquet. Nunc efficitur sagittis venenatis.',
    'Donec feugiat dignissim mauris, a tincidunt enim. Maecenas auctor massa massa, nec rutrum orci sagittis et.'
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
            <Mern />
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
        <ContentContainer
          alignItems="flex-end"
        >
          <Box as="h1" className="Title">{t('blogTitle')}</Box>
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
                <motion.div
                  custom={8}
                  initial="hidden"
                  animate="visible"
                  variants={variants}
                  style={{
                    justifyContent: 'center'
                  }}
                >
                  <Btn.Secondary 
                    variant="contained" 
                    size="large"
                    onClick={() => goToPathHandler('posts')}
                  >
                    {t('goPost')}
                  </Btn.Secondary>
                </motion.div>
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
        <ContentContainer
          alignItems="flex-start"
          mb={6}
        >
          <Box as="h1" className="Title">{t('newBlogTitle')}</Box>
          <Tooltip
            text="Click for More"
            visible={newPost}
            anchorPos="RIGHT_CENTER"
            initial={{
              borderTopRightRadius: '100px',
              borderBottomRightRadius: '100px',
              cursor: 'pointer',
              alignItems: 'center',
              width: '50%',
              height: '50%'
            }}
            animate={controlNewPostAnim}
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
                  style={{
                    justifyContent: 'center'
                  }}
                >
                  <Btn.Secondary 
                    variant="contained"
                    size="large"
                    onClick={() => goToPathHandler('create')}
                  >
                    {isAuth ? t('createPost') : t('loginContinue')}
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

Home.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Home;
