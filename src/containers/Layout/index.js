/* eslint-disable react/jsx-curly-spacing */
import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled, { themeGet, ThemeProvider, theme } from 'util/styles';
import GlobalStyles from 'util/styles/GlobalStyles';
import {
  NoSsr,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { motion, useViewportScroll } from 'framer-motion';
import { Btn } from 'components/UI/btn';
import { Icons } from 'components/UI/icons';
import BackToTop from 'components/UI/backToTop';
import 'aos/dist/aos.css';
import Navigation from 'components/Navigation';

const Header = styled(motion.header)`
  margin-bottom: ${themeGet('space.4')}px;
  width: 100%;
  display: flex;
  position: fixed;
  z-index: 1600;
  align-items: center;
  justify-content: space-between;
  height: ${themeGet('space.5')}px;

  h1 {
    height: 100%;
    background-color: inherit;
  }

  picture {
    display: flex;
    align-items: center;
    padding: 0 16px;
    height: 100%;

    > img {
      height: 74.999%;
    }
  }
`;

const MainWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const Footer = styled.div`
  background-color: rgb(15, 16, 18);
  width: 100%;
  height: 25vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: #f5f5f5;
  padding: 16px;
  position: relative;

  p {
    font-size: 13px;
    font-weight: 300;
    position: absolute;
    bottom: 0px;
    text-align: center;

    a {
      color: #e0f7fa;

      &:hover,
      &:visited {
        color: #b2ebf2;
      }
    }
  }
`;

const Layout = ({ children }) => {
  const { t, i18n } = useTranslation();
  const [openMenu, setOpenMenu] = useState(null);
  const [lang, setLang] = useState(navigator.language);
  const [y, setY] = useState(0);
  const { scrollYProgress } = useViewportScroll();
  const scroll = useCallback(
    () => {
      const { scrollY } = window;
      setY(scrollY);
    },
    [y, setY]
  );

  useEffect(() => {
    setLang(localStorage.getItem('lng' || 'i18nextLng'));

    window.addEventListener('scroll', scroll);

    return () => {
      window.removeEventListener('scroll', scroll);
    };
  }, [scroll, t]);

  const openLanguage = e => {
    setOpenMenu(e.currentTarget);

    if (openMenu)
      setOpenMenu(null);
  };

  const changeLanguage = lng => {
    let language = localStorage.getItem('lng');

    language = language
      ? language
      : lng;

    if (language !== lng) {
      language = lng;

      localStorage.setItem('lng', lng);
    }

    i18n.changeLanguage(language);
    setOpenMenu(null);
  };
  
  return (
    <NoSsr>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header
          animate={{
            background: y < 24 ? 'rgba(0, 77, 64, 0)' : 'rgba(0, 77, 64, 1)'
          }}
          initial={{
            background: 'rgba(0, 77, 64, 0)'
          }}
          transition={{
            ease: 'linear',
          }}
        >
          <picture>
            <img src="/assets/images/mern-ico.png" alt="MERN_Logo" />
          </picture>
          <Btn.Primary 
            aria-controls="language"
            aria-haspopup="true"
            onClick={openLanguage}
          >
            <Icons.Translate size="large" style={{ marginRight: '0.5rem' }} /> {lang}
          </Btn.Primary>
          <Menu
            id="language"
            anchorEl={openMenu}
            keepMounted
            open={Boolean(openMenu)}
            onClose={openLanguage}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            getContentAnchorEl={null}
            style={{
              backgroundColor: '#009688a3',
              fontWeight: 'lighter',
              cursor: 'pointer',
              marginTop: 64              
            }}
          >
            <MenuItem onClick={() => changeLanguage('es')}>
              {t('language.es')}
            </MenuItem>
            <MenuItem onClick={() => changeLanguage('en-US')}>
              {t('language.en')}
            </MenuItem>
          </Menu>
          <Navigation />
        </Header>
        <motion.div style={{
          width: '100%',
          height: '4px',
          position: 'fixed',
          top: 64,
          borderRadius: '1%',
          backgroundColor: '#222',
          scaleX: scrollYProgress,
          zIndex: 1600
        }}
        transition={{
          ease: 'linear'
        }}
        />
        <BackToTop />
        <MainWrapper>
          {children}
        </MainWrapper>
        <Footer>
          <p>
            {t('credits.0')}<a href="https://andler.netlify.com" target="__blank" >Andler Develops</a>{t('credits.1')}
          </p>
        </Footer>
      </ThemeProvider>
    </NoSsr>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
