import React from 'react';
import {Box, Divider, Flex, Heading, useBreakpointValue} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import GoogleLoginButton from './GoogleLoginButton';

export default function LoginContainer() {
  const minWidth = useBreakpointValue({
    base: '100%',
    sm: '400px',
  });

  return (
    <Flex direction="column" gap={16} flexGrow="1" minW={minWidth} data-testid="LoginContainer">
      <Flex direction="column" alignItems="center">
        <Heading fontSize="xl" textAlign="center">
          Existing Users
        </Heading>
        <Divider />
        <Box py={4}>
          <GoogleLoginButton>Sign in with Google</GoogleLoginButton>
        </Box>
      </Flex>
      <Flex direction="column" alignItems="center">
        <Heading fontSize="xl" textAlign="center">
          Create an Account
        </Heading>
        <Divider />
        <Box py={4}>
          <GoogleLoginButton>Sign up with Google</GoogleLoginButton>
        </Box>
      </Flex>
    </Flex>
  );
}

LoginContainer.propTypes = {};

LoginContainer.defaultProps = {};
