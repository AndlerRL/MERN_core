/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import './tempPolyfills';
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
 
configure({ adapter: new Adapter() });

// Fail when something is logged to error
console.error = msg => {
  throw new Error(msg);
};

global.localStorage = {
  setItem: sinon.spy(),
  getItem: sinon.spy(),
  clear: sinon.spy()
};

global.sessionStorage = {
  setItem: sinon.spy(),
  getItem: sinon.spy(),
  clear: sinon.spy()  
};

global.t = key => (key);

jest.mock('react-i18next', () => ({
  translate: () => Component => Component
}));

jest.mock('react-router-dom', () => ({
  NavLink: ({ to, children }) => <a href={to}>{children}</a>
}));
