/* eslint-disable react/display-name */
import React, { useEffect, useReducer } from 'react';
import apiService from 'services/apiService';

const initState = {
  isAuth: null,
  user: null,
  loading: false,
  error: null,
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
      error: action.error
    };
  case 'ERROR_CONFIRM':
    return {
      ...state,
      error: null,
    }
  default:
    throw new Error('Whoops, you shouldn\'t be here');
  }
};

export const AuthContext = React.createContext({
  isAuth: initState.isAuth,
  tryAutoLogin: () => {},
  login: () => {},
  logout: () => {},
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
                error: err
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
  };

  return (
    <AuthContext.Provider value={{
      login: loginHandler,
      logout: logoutHandler,
      isAuth: authState.isAuth
    }}
    >
      {children}
    </AuthContext.Provider>
  );
});

export default AuthContextProvider;
