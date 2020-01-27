import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import styled from 'util/styles';

const EndPosts = styled.div`
  background-color: rgb(15, 16, 18);
  width: 100%;
  min-height: 66vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    position: absolute;
    top: 32px;
    font-weight: 300;
    letter-spacing: 2px;
    color: #f5f5f5;
  }

  > div {
    background: url(/assets/images/end-post2.jpg) no-repeat;
    background-position: center center;
    background-size: contain;
    width: 75%;
    margin: 0 auto;
    max-width: 782px;
    height: calc(66vh - 33.33%);
    max-height: 782px;
    position: absolute;
  }
`;

const noContent = ({ is404 }) => (
  <EndPosts>
    <motion.h2>
      Well, it seems you reach at the end of all!
    </motion.h2>
    {is404 ? <motion.h1>404 – NOT FOUND</motion.h1> : null}
    <motion.div
      animate={{
        x: [null, 30, 15, -15, -30, -15],
        y: [null, 15, 30, -15, -15, -30],
        z: [null, 5, 0, -10, 5, 10],
        scale: [null, 1.04, 1.01, 1.05, 1.02, 1.03]
      }}
      transition={{
        duration: 4,
        times: [0, 0.5, 1],
        yoyo: Infinity
      }}
    />
  </EndPosts>
);

noContent.propTypes = {
  is404: PropTypes.bool
};

export default noContent;
