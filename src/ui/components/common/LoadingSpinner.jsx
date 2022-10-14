import React from 'react';
import {Flex, CircularProgress} from '@chakra-ui/react';
import PropTypes from 'prop-types';

export default function LoadingSpinner() {
  return (
    <Flex w="100%" h="100%" minH="100vh" justifyContent="center" alignItems="center">
      <CircularProgress isIndeterminate color="#396afc" size="100px" />
    </Flex>
  );
}

LoadingSpinner.propTypes = {};

LoadingSpinner.defaultProps = {};
