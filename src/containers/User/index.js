import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { themeGet } from 'util/styles';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Paper,
  CardMedia,
  Avatar
} from '@material-ui/core';
import {
  Dashboard,
  Posts,
  Comments,
} from 'components/User';
import { AuthContext } from 'context/auth-context';
import apiService from 'services/apiService';
import { Flex } from 'rebass';

const UserContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;

  .MuiTypography-h3 {
    padding: 32px 0;
  }
`;

const UserHead = styled(CardContent)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  position: relative;
  height: 0;
  padding: 0 !important;
`;

const UserAvatar = styled(Avatar)`
  width: 140px !important;
  height: 140px !important;
  position: absolute;
  top: 0;
  right: 0px;
  margin-top: 0;
  box-shadow: ${themeGet('shadows.d1_half.0')},
    ${themeGet('shadows.d1_half.1')},
    ${themeGet('shadows.d1_half.2')};

  @media screen and (min-width: ${themeGet('breakpoints.1')}) {
    right: 32px;
  }
`;

const CardImg = styled(CardMedia)`
  height: 41.666vh;
  width: 100%;
`;

const UserName = styled(Typography)`
  position: absolute;
  padding: 8px 94px 8px 0;
  font-size: 1.25rem !important;
  width: 100%;
  top: -20px;
  right: 64px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-family: 'Poppins', sans-serif !important;
  background-color: ${themeGet('colors.secondary.500')};

  @media screen and (min-width: ${themeGet('breakpoints.1')}) {
    padding: 8px 140px 8px 0;
    font-size: initial;
  }
`;

const UserPanel = styled(Flex)`
  min-height: 100vh;
  background-color: ${themeGet('colors.secondary.500')};
`;

const MainContent = styled(Flex)`
`;

const User = ({ location }) => {
  const [userData, setUserData] = useState(null);
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  
  const getUserHandler = id => {
    if (user && user.id === id)
      return;

    apiService.getUser(id)
      .then(res => {
        console.log(res);
        setUserData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    let userId = 0;

    for (const param of query.entries()) {
      if (param[0] === 'id')
        userId = param[1];
    }

    getUserHandler(userId);
  }, []);

  const profileInfo = userData ? userData : user;
  const userInitials = profileInfo && (profileInfo.first).substring(0, 1) + (profileInfo.last).substring(0, 1);
  return profileInfo && (
    <UserContainer>
      <CardImg
        component="img"
        alt="img-head"
        image={`https://via.placeholder.com/2160x1080/212121/F5F5F5/?text=${profileInfo.first}+Background+Image`}
      />
      <UserHead>
        <UserName
          variant="h5"
        >
          {profileInfo.username}
        </UserName>
        <UserAvatar>{profileInfo && userInitials}</UserAvatar>
      </UserHead>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        width={1}
        flexDirection={['column', 'row', 'row']}
      >
        <UserPanel
          alignItems="center"
          jutifyContent="flex-start"
          width={[1, 1 / 3, 1 / 3]}
        >
          Panel Goes Here
        </UserPanel>
        <MainContent
          alignItems="center"
          justifyContent="space-between"
          flexDirection="column"
          width={10 / 12}
        >

          <Dashboard user={profileInfo} />
          <Posts user={profileInfo} />
          <Comments user={profileInfo} />
        </MainContent>
      </Flex>
    </UserContainer>
  );
};

User.propTypes = {
  location: PropTypes.object
};

export default User;
