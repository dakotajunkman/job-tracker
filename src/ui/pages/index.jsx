import React from 'react';
import {useSession, signOut} from 'next-auth/react';
import {Button, Flex} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import PageWrapper from '../components/common/PageWrapper';
import WhyJobTracker from '../components/landing_page/WhyJobTracker';
import LoginContainer from '../components/landing_page/LoginContainer';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function Home() {
  const {data: session, status} = useSession();

  if (status === 'loading') return <LoadingSpinner />;

  /* Dashboard for Logged In Users */
  if (session) {
    /* TODO: Create Dashboard -- Displaying Session Tokens Below for Debugging*/
    return (
      <Flex direction="column" p={16} gap={16}>
        <div>
          <strong>accessToken:</strong> {session.accessToken}
        </div>
        <div>
          <strong>expires:</strong> {session.expires}
        </div>
        <div>
          <strong>user:</strong> {JSON.stringify(session.user)}
        </div>
        <Button onClick={() => signOut()}>Sign out</Button>
      </Flex>
    );
  }

  /* Landing Page for Logged Out Users */
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
