import React from 'react';
import PropTypes from 'prop-types';
import {Flex} from '@chakra-ui/react';
import PageWrapper from '../common/PageWrapper';
import WhyJobTracker from '../landing_page/WhyJobTracker';
import LoginContainer from '../landing_page/LoginContainer';

export default function LandingPage() {
  return (
    <PageWrapper showBackground showMenu={false}>
      <Flex alignItems="center">
        <Flex
          bg="#ffffff"
          p={8}
          borderRadius="lg"
          shadow="xl"
          flexWrap="wrap"
          gap={16}
          mx={4}
          justifyContent="center"
        >
          <WhyJobTracker />
          <LoginContainer />
        </Flex>
      </Flex>
    </PageWrapper>
  );
}

LandingPage.propTypes = {};

LandingPage.defaultProps = {};
