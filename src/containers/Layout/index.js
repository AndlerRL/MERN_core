/* eslint-disable react/jsx-curly-spacing */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled, { themeGet, ThemeProvider, theme } from 'util/styles';
import GlobalStyles from 'util/styles/GlobalStyles';
import { NavLink } from 'react-router-dom';
import {
  BottomNavigation,
  BottomNavigationAction,
  NoSsr,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { motion, useViewportScroll, useAnimation } from 'framer-motion';
import { Btn } from 'components/UI/btn';
import { Icons } from 'components/UI/icons';
import 'aos/dist/aos.css';

const Header = styled(motion.header)`
  margin-bottom: ${themeGet('space.4')}px;
  width: 100%;
  display: flex;
  position: fixed;
  z-index: 1600;
  align-items: center;
  justify-content: space-between;
  height: ${themeGet('space.5')}px;

  h1,
  .Navigation {
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

  .Navigation {
    width: 300px;
    position: relative;
    background-color: inherit;

    .Mui-selected {
      color: ${themeGet('colors.secondary.500')};

      svg {
        color: ${themeGet('colors.secondary.500')};
      }
    }
  }
`;

const MainWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const Footer = styled.div`
  background-color: rgba(0, 77, 64, 1);
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
  const [navValue, setNavValue] = useState(t('navigation.p1'));
  const [openMenu, setOpenMenu] = useState(null);
  const [lang, setLang] = useState(navigator.language);
  const [y, setY] = useState(window.scrollY);
  const { scrollYProgress } = useViewportScroll();
  const controls = useAnimation();

  useEffect((y = window.scrollY) => {
    if (window.location.pathname !== '/') {
      if (window.location.pathname === '/posts')
        setNavValue(t('navigation.p2'));
      else
        setNavValue(t('navigation.p3'));
    }

    setLang(localStorage.getItem('lng' || 'i18nextLng'));

    window.addEventListener('scroll', () => {
      if (y !== window.scrollY)
        setY(window.scrollY);
    });

    return () => {
      if (window.location.pathname !== '/') {
        if (window.location.pathname === '/posts')
          setNavValue(t('navigation.p2'));
        else
          setNavValue(t('navigation.p3'));
      }

      setLang(localStorage.getItem('lng' || 'i18nextLng'));
    };
  });

  const navChangeHandler = (e, newVal) => {
    setNavValue(newVal);
  };

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

  controls.start(() => y > 24 && {
    background: 'rgba(0, 77, 64, 1)',
  });

  controls.start(() => y < 24 && {
    background: 'rgba(0, 77, 64, 0)',
  });
  
  return (
    <NoSsr>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header
          animate={controls}
          initial={{
            background: 'rgba(0, 77, 64, 0)'
          }}
          transition={{
            type: 'spring',
            stiffness: 800,
            damping: 35,
            duration: 1
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
              vertical: 'top',
              horizontal: 'center'
            }}
            style={{
              marginTop: 40,
              backgroundColor: '#009688a3',
              fontWeight: 'lighter',
              cursor: 'pointer'
            }}
          >
            <MenuItem onClick={() => changeLanguage('es')}>
              {t('language.es')}
            </MenuItem>
            <MenuItem onClick={() => changeLanguage('en-US')}>
              {t('language.en')}
            </MenuItem>
          </Menu>
          <BottomNavigation 
            value={navValue} 
            onChange={navChangeHandler}
            className="Navigation"
          >
            <BottomNavigationAction 
              label={t('navigation.p1')}
              value={t('navigation.p1')}
              icon={
                <NavLink to="/" style={{ width: '100%', minHeight: '100%' }}>
                  <Icons.Home />
                </NavLink>}
            />
            <BottomNavigationAction 
              label={t('navigation.p2')}
              value={t('navigation.p2')}
              icon={
                <NavLink to="/posts" style={{ width: '100%', minHeight: '100%' }}>
                  <Icons.Posts />
                </NavLink>}
            />
            <BottomNavigationAction 
              label={t('navigation.p3')}
              value={t('navigation.p3')}
              icon={
                <NavLink to="/admin/new-post" style={{ width: '100%', minHeight: '100%' }}>
                  <Icons.NewPost />
                </NavLink>}
            />
          </BottomNavigation>
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
          ease: 'linear',
        }}
        />
        <MainWrapper>
          {children}
        </MainWrapper>
        <Footer>
          <p>
            Website developed by <a href="https://andler.netlify.com" target="__blank" >Andler Develops</a>. 2020 ® All rights reserved.
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
