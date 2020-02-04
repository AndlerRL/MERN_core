import React, { useState } from 'react';

export const AuthContext = React.createContext({
  isAuth: true,
  login: () => {},
  logout: () => {}
});

const AuthContextProvider = ({ children }) => {
  const [isAuth,setIsAuth] = useState(false);
  
  const loginHandler = () => {
    setIsAuth(true);
  };

  const logoutHandler = () => {
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{
      login: loginHandler,
      logout: logoutHandler,
      isAuth
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
