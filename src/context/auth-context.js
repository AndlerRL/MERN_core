/* eslint-disable react/display-name */
import React, { useEffect, useReducer } from 'react';
import apiService from 'services/apiService';
import PropTypes from 'prop-types';

const initState = {
  isAuth: null,
  user: null,
  loading: false,
  backError: null,
  clientError: null,
  authRedirectPath: '/'
};

const authReducer = (state, action) => {
  switch (action.type) {
  case 'AUTH_START':
    return {
      ...state,
      loading: true
    };
  case 'AUTH_SUCCESS':
    return {
      ...state,
      loading: false,
      user: action.user,
      isAuth: action.isAuth
    };
  case 'AUTH_FAIL': 
    return {
      ...state,
      loading: false,
      backError: action.backError
    };
  case 'CLIENT_ERROR':
    return {
      ...state,
      loading: false,
      clientError: action.clientError
    };
  case 'ERROR_CONFIRM':
    return {
      ...state,
      backError: null,
      clientError: null,
    };
  case 'SET_PATH':
    return {
      ...state,
      authRedirectPath: action.authRedirectPath
    };
  case 'LOGOUT':
    return {
      ...state,
      user: null,
      isAuth: null,
    };
  default:
    throw new Error('Whoops, you shouldn\'t be here');
  }
};

export const AuthContext = React.createContext({
  isAuth: initState.isAuth,
  tryAutoLogin: () => {},
  getError: () => {},
  login: () => {},
  logout: () => {},
  errorConfirm: () => {},
});

const AuthContextProvider = React.memo(({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initState);
  
  const tryAutoLogin = () => {
    const token = localStorage.getItem('token');

    if (token !== null) {
      const expDate = new Date(localStorage.getItem('expDate'));

      if (expDate <= new Date()) {
        logoutHandler();
      } else {
        dispatch({
          type: 'AUTH_START'
        });

        const userID = localStorage.getItem('userID');

        if (!authState.isAuth) {
          apiService
            .getUser(userID)
            .then(res => {
              dispatch({
                type: 'AUTH_SUCCESS',
                user: res.data,
                isAuth: token !== null
              });
            })
            .catch(err => {
              dispatch({
                type: 'AUTH_FAIL',
                backError: err
              });
            });
        }
      }
    } else {
      logoutHandler();
    }
  };

  useEffect(() => {
    tryAutoLogin();

    return () => {
      tryAutoLogin();
    };
  }, []);

  const loginHandler = (userData, token) => {
    dispatch({
      type: 'AUTH_START'
    });

    const expDate = new Date(
      new Date().getTime() + 43200000
    );
    localStorage.setItem('userID', userData.id);
    localStorage.setItem('token', token);
    localStorage.setItem('expDate', expDate);

    dispatch({
      type: 'AUTH_SUCCESS',
      user: userData,
      isAuth: token !== null
    });
  };

  const logoutHandler = () => {
    localStorage.removeItem('userID');
    localStorage.removeItem('token');
    localStorage.removeItem('expDate');

    dispatch({
      type: 'LOGOUT'
    });
  };

  const getClientError = err => {
    dispatch({
      type: 'CLIENT_ERROR',
      clientError: err
    });
  };

  const authRedirectPathHandler = path => {
    dispatch({
      type: 'SET_PATH',
      authRedirectPath: path
    });
  };

  const errorConfirmHandler = () => {
    dispatch({
      type: 'ERROR_CONFIRM',
    });
  };

  return (
    <AuthContext.Provider value={{
      login: loginHandler,
      logout: logoutHandler,
      authRedirectPath: authRedirectPathHandler,
      isAuth: authState.isAuth,
      redirectPath: authState.authRedirectPath,
      getError: getClientError,
      clientError: authState.clientError,
      backError: authState.backError,
      errorConfirm: errorConfirmHandler,
      user: authState.user
    }}
    >
      {children}
    </AuthContext.Provider>
  );
});

AuthContextProvider.propTypes = {
  children: PropTypes.any.isRequired
};

export default AuthContextProvider;
