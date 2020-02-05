/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable react/display-name */
import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { themeGet } from 'util/styles';
import { NavLink } from 'react-router-dom';
import {
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core';
import { Icons } from 'components/UI/icons';
import { AuthContext } from 'context/auth-context';

const NavigationContainer = styled(BottomNavigation)`
  height: 100%;
  width: 300px;
  position: relative;
  background-color: transparent !important;

  .Mui-selected,
  .MuiBottomNavigationAction-label {
    font-size: 0.875rem;
    color: ${themeGet('colors.secondary.500')};

    svg {
      color: ${themeGet('colors.secondary.500')};
    }
  }
`;

const Navigation = () => {
  const { t } = useTranslation();
  const [navValue, setNavValue] = useState(t('navigation.p1'));
  const authContext = useContext(AuthContext);
  const { isAuth } = authContext;

  useEffect(() => {
    const { pathname } = window.location;
  
    switch (pathname) {
    case '/posts':
      setNavValue(t('navigation.p2'));
      break;
    case '/admin/new-post':
      setNavValue(t('navigation.p3'));
      break;
    case '/login':
      setNavValue(t('navigation.p4'));
      break;
    case '/logout':
      setNavValue(t('navigation.p5'));
      break;
    default:
      setNavValue(t('navigation.p1'));
      break;
    }
  }, [setNavValue, isAuth, t]);

  const navChangeHandler = (e, newVal) => {
    setNavValue(newVal);
  };

  let navItems = (
    <NavigationContainer 
      value={navValue}
      onChange={navChangeHandler}
    >
      <BottomNavigationAction 
        label={t('navigation.p1')}
        value={t('navigation.p1')}
        showLabel={navValue === t('navigation.p1')}
        icon={
          <NavLink to="/" style={{ width: '100%', minHeight: '100%' }}>
            <Icons.Home />
          </NavLink>
        }
      />
      <BottomNavigationAction 
        label={t('navigation.p2')}
        value={t('navigation.p2')}
        showLabel={navValue === t('navigation.p2')}
        icon={
          <NavLink to="/posts" style={{ width: '100%', minHeight: '100%' }}>
            <Icons.Posts />
          </NavLink>
        }
      />
      <BottomNavigationAction 
        label={t('navigation.p4')}
        value={t('navigation.p4')}
        showLabel={navValue === t('navigation.p4')}
        icon={
          <NavLink to="/login" style={{ width: '100%', minHeight: '100%' }}>
            <Icons.Auth />
          </NavLink>
        }
      />
    </NavigationContainer>
  );

  if (isAuth) {
    navItems = (
      <NavigationContainer
        value={navValue}
        onChange={navChangeHandler}
      >
        <BottomNavigationAction 
          label={t('navigation.p1')}
          value={t('navigation.p1')}
          showLabel={navValue === t('navigation.p1')}
          icon={
            <NavLink to="/" style={{ width: '100%', minHeight: '100%' }}>
              <Icons.Home />
            </NavLink>
          }
        />
        <BottomNavigationAction 
          label={t('navigation.p2')}
          value={t('navigation.p2')}
          showLabel={navValue === t('navigation.p2')}
          icon={
            <NavLink to="/posts" style={{ width: '100%', minHeight: '100%' }}>
              <Icons.Posts />
            </NavLink>
          }
        />
        <BottomNavigationAction 
          label={t('navigation.p3')}
          value={t('navigation.p3')}
          showLabel={navValue === t('navigation.p3')}
          icon={
            <NavLink to="/admin/new-post" style={{ width: '100%', minHeight: '100%' }}>
              <Icons.NewPost />
            </NavLink>
          }
        />
        <BottomNavigationAction 
          label={t('navigation.p5')}
          value={t('navigation.p5')}
          showLabel={navValue === t('navigation.p5')}
          icon={
            <NavLink to="/logout" style={{ width: '100%', minHeight: '100%' }}>
              <Icons.Logout />
            </NavLink>
          }
        />
      </NavigationContainer>
    );
  }

  return navItems;
};

export default Navigation;
