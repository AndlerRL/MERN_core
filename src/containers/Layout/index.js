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
import { Text } from 'rebass';
import { Btn } from 'components/UI/btn';
import { Icons } from 'components/UI/icons';

const Header = styled.header`
  margin-bottom: ${themeGet('space.4')}px;
  width: 100%;
  display: flex;
  position: fixed;
  z-index: 1600;
  align-items: center;
  justify-content: space-between;
  height: ${themeGet('space.5')}px;
  background-color: ${themeGet('colors.primary.50')};

  h1,
  .Navigation {
    height: 100%;
  }

  h1 {
    display: flex;
    align-items: center;
    padding: 0 16px;
  }

  .Navigation {
    width: 300px;
    position: relative;
    background-color: ${themeGet('colors.primary.50')};

    .Mui-selected {
      color: ${themeGet('colors.secondary.500')};

      svg {
        color: ${themeGet('colors.secondary.500')};
      }
    }
  }

`;

const i18nextLng = localStorage.getItem('i18nextLng');

const Layout = ({ children }) => {
  const { t, i18n } = useTranslation();
  const [navValue, setNavValue] = useState(t('navigation.p1'));
  const [openMenu, setOpenMenu] = useState(null);
  const [lang, setLang] = useState(navigator.language);

  useEffect(() => {
    if (window.location.pathname !== '/') {
      if (window.location.pathname === '/posts')
        setNavValue(t('navigation.p2'));
      else
        setNavValue(t('navigation.p3'));
    }

    setLang(localStorage.getItem('lng'));
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
  
  return (
    <NoSsr>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header>
          <Text 
            as="h1"
            width={1 / 3}
            textAlign="center"
          >
            {t('title')}
          </Text>
          <Btn.Primary 
            aria-controls="language"
            aria-haspopup="true"
            onClick={openLanguage}
          >
            <Icons.Translate size="large" style={{ marginRight: '0.5rem' }} /> {lang || i18nextLng}
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
              fontWeight: 'lighter'
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
        {children}
      </ThemeProvider>
    </NoSsr>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
