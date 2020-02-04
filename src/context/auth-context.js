import React, { useState } from 'react';
import useHash from 'hooks/useHash';

export const AuthContext = React.createContext({
  isAuth: true,
  checkPW: () => {},
  login: () => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [isAuth,setIsAuth] = useState(false);
  const { sha1, sha256, sha384, sha512 } = useHash();
  
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
