import React from 'react';
import {useSession} from 'next-auth/react';
import {Flex, Heading, Text, useBreakpointValue} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import PageWrapper from '../common/PageWrapper';
import NavigationSidebar from './NavigationSidebar';
import ApplicationSection from './ApplicationSection';
import exampleJSON from '../../public/json/applicationsExample.json';

const IN_PROGRESS_STATUSES = [
  'assigned_oa',
  'completed_oa',
  'phone_screen_scheduled',
  'phone_screen_complete',
  'interview_scheduled',
  'interview_complete',
  'received_offer',
];
const CLOSED_STATUSES = [
  'accepted_offer',
  'rejected_offer',
  'rejected_by_company',
  'position_cancelled',
];

export default function Dashboard() {
  const {data: session} = useSession();

  const showSidebar = useBreakpointValue({
    base: false,
    lg: true,
  });
  const openApplications = exampleJSON.applications.filter(
    application => application.status === 'applied'
  );
  const inProgressApplications = exampleJSON.applications.filter(application =>
    IN_PROGRESS_STATUSES.includes(application.status)
  );
  const closedApplications = exampleJSON.applications.filter(application =>
    CLOSED_STATUSES.includes(application.status)
  );

  return (
    <PageWrapper>
      <Flex maxW="1200px" w="100%" gap={4} h="100%" alignItems="flex-start" mx={4}>
        {showSidebar && <NavigationSidebar />}
        <Flex
          direction="column"
          bg="white"
          flexGrow="1"
          p={4}
          pb={8}
          borderRadius="md"
          boxShadow="lg"
          gap={8}
          maxW="100%"
          overflowX="hidden"
        >
          <Flex direction="column">
            <Heading size="lg">Dashboard for {session.user.name}</Heading>
            <Text color="#888">
              Applications at a Glance: {inProgressApplications.length} In-Progress,{' '}
              {openApplications.length} Open, {closedApplications.length} Closed
            </Text>
          </Flex>
          <ApplicationSection
            heading="In-Progress Applications"
            applicationData={inProgressApplications}
          />
          <ApplicationSection heading="Open Applications" applicationData={openApplications} />
          <ApplicationSection
            heading="Closed Applications"
            applicationData={closedApplications}
            startOpened={false}
          />
        </Flex>
      </Flex>
    </PageWrapper>
  );
}

Dashboard.propTypes = {};

Dashboard.defaultProps = {};
