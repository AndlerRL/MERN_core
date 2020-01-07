import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled, { themeGet, ThemeProvider, theme } from 'util/styles';
import GlobalStyles from 'util/styles/GlobalStyles';
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

const Layout = ({ children }) => {
  const { t, i18n } = useTranslation();
  const [navValue, setNavValue] = useState(t('navigation.p1'));
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    
  }, []);

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
            {t('language.title')}
          </Btn.Primary>
          <Menu
            id="language"
            anchorEl={openMenu}
            keepMounted
            open={Boolean(openMenu)}
            onClose={openLanguage}
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
              icon={<Icons.Home />}
            />
            <BottomNavigationAction 
              label={t('navigation.p2')}
              value={t('navigation.p2')}
              icon={<Icons.Posts />}  
            />
            <BottomNavigationAction 
              label={t('navigation.p3')}
              value={t('navigation.p3')}
              icon={<Icons.NewPost />}  
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
