import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import styled from 'util/styles';
import { Redirect } from 'react-router-dom';

const EndPosts = styled.div`
  background-color: rgb(15, 16, 18);
  width: 100%;
  min-height: 66vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1,
  h2 {
    position: absolute;
    top: 32px;
    font-weight: 300;
    letter-spacing: 2px;
    color: #f5f5f5;
    z-index: 100;
    text-align: center;

    &:last-child {
      top: auto !important;
      bottom: 0;
    }
  }

  > div {
    background: url(/assets/images/end-post.jpg) no-repeat;
    background-position: center center;
    background-size: contain;
    width: 91.666%;
    margin: 0 auto;
    max-width: 880px;
    height: calc(66vh - 33.33%);
    max-height: 880px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;

    > div {
      background: url(/assets/images/astronaut.png) no-repeat;
      background-position: center center;
      background-size: contain;
      width: 66%;
      margin: 0 auto;
      max-width: 405px;
      height: 66%;
      max-height: 405px;
      position: absolute;
      top: 24px;
    }
  }
`;

const NoContent = ({ is404 }) => {
  const { t } = useTranslation();
  const [redirect, setRedirect] = useState(false);

  const redirectHandler = () => {
    setRedirect(true);
  };

  return (
    <EndPosts>
      {redirect && <Redirect to="/" />}
      {is404 ?
        <motion.h1>{t('noContent.is404.0')}</motion.h1>
        : <motion.h2>{t('noContent.endPost')}</motion.h2>}
      <div>
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
      </div>
      {is404 && (
        <motion.h2
          animate={{
            opacity: [null, 0.5, 1],
            scale: [null, 1.05, 1]
          }}
          transition={{
            duration: 2,
            yoyo: Infinity
          }}
          onTap={redirectHandler}
          style={{
            cursor: 'pointer'
          }}
        >
          {t('noContent.is404.1')}
        </motion.h2>
      )}
    </EndPosts>
  )
};

NoContent.propTypes = {
  is404: PropTypes.bool
};

NoContent.defaultProps = {
  is404: false
};

export default NoContent;
