/* eslint-disable arrow-body-style */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'util/styles';

const Dashboard = ({ user }) => {
  return (
    <h1>Dashboard Section for {user.first} Profile.</h1>
  );
};

const Posts = ({ user }) => {
  return (
    <h1>Posts Written Section for {user.first} Profile.</h1>
  );
};

const Comments = ({ user }) => {
  return (
    <h1>Comments Made Section for {user.first} Profile.</h1>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
};

Posts.propTypes = {
  user: PropTypes.object.isRequired,
};

Comments.propTypes = {
  user: PropTypes.object.isRequired,
};

export {
  Dashboard,
  Posts,
  Comments
};
