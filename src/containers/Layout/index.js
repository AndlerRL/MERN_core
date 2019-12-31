import React from 'react';
import PropTypes from 'prop-types';

const Layout = ({ children }) => (
  <div>
    <header>
      <p>
        Header section
      </p>
    </header>
    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
