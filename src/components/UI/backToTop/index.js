import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Icons } from 'components/UI/icons';
import styled, { themeGet } from 'util/styles';

const Container = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 64px;
  right: 32px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #222;
  cursor: pointer;
  z-index: 1600;
  box-shadow: ${themeGet('shadows.d3.0')},
    ${themeGet('shadows.d3.1')},
    ${themeGet('shadows.d3.2')};
`;

const BackToTop = () => {
  const [y, setY] = useState(0);
  const [height, setHeight] = useState(0);
  const scroll = useCallback(
    () => {
      const { scrollY } = window;
      setY(scrollY);
    },
    [setY]
  );
  const resize = useCallback(
    () => {
      const { innerHeight } = window;
      setHeight(innerHeight);
    },
    [setHeight]
  );

  useEffect(() => {
    window.addEventListener('scroll', scroll);
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('resize', resize);
    };
  }, [scroll, resize]);

  const backToTopHandler = () => {
    window.scroll({
      left: 0,
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Container
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: y > height ? 1 : 0,
        scale: y > height ? 1 : 0.25,
        rotateZ: y > height ? 0 : 180,
      }}
      whileTap={{
        scale: 0.95
      }}
      transition={{
        ease: 'backInOut',
      }}
      onTap={backToTopHandler}
    >
      <Icons.ArrowUp size="large" />
    </Container>
  );
};

export default BackToTop;
