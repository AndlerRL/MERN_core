import React, { useEffect, useContext } from 'react';
import { AuthContext } from 'context/auth-context';
import PropTypes from 'prop-types';

const Logout = ({ history }) => {
  const authContext = useContext(AuthContext);
  const { logout } = authContext;

  useEffect(() => {
    logout();

    history.push('/');
  }, [history, logout]);

  return <div style={{ width: '100%', height: '100vh', backgroundColor: 'rgb(15, 16, 18)' }} />;
};

Logout.propTypes = {
  history: PropTypes.object
};

export default Logout;
