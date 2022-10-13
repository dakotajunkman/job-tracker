import React from 'react';
import {Flex} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import PageWrapper from '../components/common/PageWrapper';
import WhyJobTracker from '../components/landing_page/WhyJobTracker';
import LoginContainer from '../components/landing_page/LoginContainer';

export default function Home() {
  return (
    <PageWrapper>
      <Flex bg="#ffffff" p={8} borderRadius="lg" shadow="xl" flexWrap="wrap" gap={16} mx={4}>
        <WhyJobTracker />
        <LoginContainer />
      </Flex>
    </PageWrapper>
  );
}

Home.propTypes = {};

Home.defaultProps = {};
