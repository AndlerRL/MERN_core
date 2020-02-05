import React from 'react';
import { Flex } from 'rebass';
import styled from 'util/styles';
import NoContent from './UI/noContent';

const NoContentContainer = styled(Flex)`
  height: 100vh;
  background-color: rgb(15, 16, 18);
`;

const NotFound = () => (
  <NoContentContainer
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    width={1}
  >
    <NoContent is404 />
  </NoContentContainer>
);

export default NotFound;
