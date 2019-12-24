import React from 'react';
import { Flex, Text } from 'rebass';

const NotFound = () => (
  <Flex
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    width={1}
    maxWidth="600px"
  >
    <Text as="h1">404 – Page Not Found</Text>
  </Flex>
);

export default NotFound;
