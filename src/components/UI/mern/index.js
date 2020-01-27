import React from 'react';
import styled from 'util/styles';
import { motion } from 'framer-motion';

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

const Mern = styled(motion.div)`
  position: relative;
  height: 100%;
  width: 83.333%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  font-family: 'Poppins', sans-serif;
  font-weight: 900;

  div {
    width: 25%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    box-sizing: border-box;

    span {
      height: 110px;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;

      &:last-of-type {
        height: 114px;
        letter-spacing: 6px;
        align-items: center;
      }

      &:first-of-type {
        font-size: 78px;
      }
    }
  }

  div:nth-child(1) {
    span:last-of-type {
      ${'' /* animation: 1s ${anim.transparent} cubic-bezier(0.6, 0.04, 0.98, 0.335) forwards 2000ms; */}
      color: #3F3E42;
      font-size: 24px;
      text-transform: uppercase;
      text-shadow: 0px 0px 6px #E8E7D5,
        1px 1px 1px #E8E7D5,
        2px 2px 2px #E8E7D5,
        -1px -1px 1px #E8E7D5,
        -2px -2px 2px #E8E7D5,
        -1px 1px 1px #E8E7D5,
        -2px 2px 2px #E8E7D5,
        1px -1px 1px #E8E7D5,
        2px -2px 2px #E8E7D5,
        1px 0px 1px #E8E7D5,
        2px 0px 2px #E8E7D5,
        0px 1px 1px #E8E7D5,
        0px 2px 2px #E8E7D5,
        -1px 0px 1px #E8E7D5,
        -2px 0px 2px #E8E7D5,
        0px -1px 1px #E8E7D5,
        0px -2px 2px #E8E7D5;
    }

    span:first-of-type {
      z-index: 1;
      ${'' /* animation: 1.5s ${anim.fadeOutM} cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 3750ms; */}
      color: #3FA037;
      text-shadow: 0px 0px 6px #4DB33D,
        1px 1px 1px #4DB33D,
        2px 2px 2px #4DB33D,
        -1px -1px 1px #4DB33D,
        -2px -2px 2px #4DB33D,
        -1px 1px 1px #4DB33D,
        -2px 2px 2px #4DB33D,
        1px -1px 1px #4DB33D,
        2px -2px 2px #4DB33D,
        1px 0px 1px #4DB33D,
        2px 0px 2px #4DB33D,
        0px 1px 1px #4DB33D,
        0px 2px 2px #4DB33D,
        -1px 0px 1px #4DB33D,
        -2px 0px 2px #4DB33D,
        0px -1px 1px #4DB33D,
        0px -2px 2px #4DB33D;
    }
  }

  > div:nth-child(2) {
    span:last-of-type {
      ${'' /* animation: 1s ${anim.transparent} cubic-bezier(0.6, 0.04, 0.98, 0.335) forwards 2000ms; */}
      color: #68A063;
      font-size: 24px;
      text-transform: uppercase;
      text-shadow: 0px 0px 6px #3C873A,
        1px 1px 1px #3C873A,
        2px 2px 2px #3C873A,
        -1px -1px 1px #3C873A,
        -2px -2px 2px #3C873A,
        -1px 1px 1px #3C873A,
        -2px 2px 2px #3C873A,
        1px -1px 1px #3C873A,
        2px -2px 2px #3C873A,
        1px 0px 1px #3C873A,
        2px 0px 2px #3C873A,
        0px 1px 1px #3C873A,
        0px 2px 2px #3C873A,
        -1px 0px 1px #3C873A,
        -2px 0px 2px #3C873A,
        0px -1px 1px #3C873A,
        0px -2px 2px #3C873A;
    }

    span:first-of-type {
      z-index: 1;
      ${'' /* animation: 1.5s ${anim.fadeOutE} cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 3750ms; */}
      color: #303030;
      text-shadow: 0px 0px 6px #3C873A,
        1px 1px 1px #3C873A,
        2px 2px 2px #3C873A,
        -1px -1px 1px #3C873A,
        -2px -2px 2px #3C873A,
        -1px 1px 1px #3C873A,
        -2px 2px 2px #3C873A,
        1px -1px 1px #3C873A,
        2px -2px 2px #3C873A,
        1px 0px 1px #3C873A,
        2px 0px 2px #3C873A,
        0px 1px 1px #3C873A,
        0px 2px 2px #3C873A,
        -1px 0px 1px #3C873A,
        -2px 0px 2px #3C873A,
        0px -1px 1px #3C873A,
        0px -2px 2px #3C873A;
    }
  }

  > div:nth-child(3) {
    span:last-of-type {
      ${'' /* animation: 1s ${anim.transparent} cubic-bezier(0.6, 0.04, 0.98, 0.335) forwards 2000ms; */}
      color: #424242;
      font-size: 24px;
      text-transform: uppercase;
      text-shadow: 0px 0px 6px #61DBFB,
        1px 1px 1px #61DBFB,
        2px 2px 2px #61DBFB,
        -1px -1px 1px #61DBFB,
        -2px -2px 2px #61DBFB,
        -1px 1px 1px #61DBFB,
        -2px 2px 2px #61DBFB,
        1px -1px 1px #61DBFB,
        2px -2px 2px #61DBFB,
        1px 0px 1px #61DBFB,
        2px 0px 2px #61DBFB,
        0px 1px 1px #61DBFB,
        0px 2px 2px #61DBFB,
        -1px 0px 1px #61DBFB,
        -2px 0px 2px #61DBFB,
        0px -1px 1px #61DBFB,
        0px -2px 2px #61DBFB;
    }

    span:first-of-type {
      z-index: 1;
      ${'' /* animation: 1.5s ${anim.fadeOutR} cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 3750ms; */}
      color: #61DBFB;
      text-shadow: 0px 0px 6px #424242,
        1px 1px 1px #424242,
        2px 2px 2px #424242,
        -1px -1px 1px #424242,
        -2px -2px 2px #424242,
        -1px 1px 1px #424242,
        -2px 2px 2px #424242,
        1px -1px 1px #424242,
        2px -2px 2px #424242,
        1px 0px 1px #424242,
        2px 0px 2px #424242,
        0px 1px 1px #424242,
        0px 2px 2px #424242,
        -1px 0px 1px #424242,
        -2px 0px 2px #424242,
        0px -1px 1px #424242,
        0px -2px 2px #424242;
    }
  }

  > div:nth-child(4) {
    span:last-of-type {
      ${'' /* animation: 1s ${anim.transparent} cubic-bezier(0.6, 0.04, 0.98, 0.335) forwards 2000ms; */}
      color: #3C873A;
      font-size: 24px;
      text-transform: uppercase;
      text-shadow: 0px 0px 6px #68A063,
        1px 1px 1px #68A063,
        2px 2px 2px #68A063,
        -1px -1px 1px #68A063,
        -2px -2px 2px #68A063,
        -1px 1px 1px #68A063,
        -2px 2px 2px #68A063,
        1px -1px 1px #68A063,
        2px -2px 2px #68A063,
        1px 0px 1px #68A063,
        2px 0px 2px #68A063,
        0px 1px 1px #68A063,
        0px 2px 2px #68A063,
        -1px 0px 1px #68A063,
        -2px 0px 2px #68A063,
        0px -1px 1px #68A063,
        0px -2px 2px #68A063;
    }

    span:first-of-type {
      z-index: 1;
      ${'' /* animation: 1.5s ${anim.fadeOutN} cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 3750ms; */}
      color: #303030;
      text-shadow: 0px 0px 6px #68A063,
        1px 1px 1px #68A063,
        2px 2px 2px #68A063,
        -1px -1px 1px #68A063,
        -2px -2px 2px #68A063,
        -1px 1px 1px #68A063,
        -2px 2px 2px #68A063,
        1px -1px 1px #68A063,
        2px -2px 2px #68A063,
        1px 0px 1px #68A063,
        2px 0px 2px #68A063,
        0px 1px 1px #68A063,
        0px 2px 2px #68A063,
        -1px 0px 1px #68A063,
        -2px 0px 2px #68A063,
        0px -1px 1px #68A063,
        0px -2px 2px #68A063;
    }
  }
`;

const MernComponent = () => {
  const MERN = [
    'Mongo',
    'Express',
    'React',
    'Node'
  ];

  return (
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
  );
};

export default MernComponent;
