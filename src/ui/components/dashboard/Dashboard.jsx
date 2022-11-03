import React from 'react';
import {useSession} from 'next-auth/react';
import {Flex, Heading, Icon, Text, useBreakpointValue, useDisclosure} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import PageWrapper from '../common/PageWrapper';
import NavigationSidebar from '../common/navigation/NavigationSidebar';
import ApplicationSection from './ApplicationSection';
import exampleJSON from '../../public/json/applicationsExample.json';
import {MdPostAdd} from 'react-icons/md';
import PrimaryButton from '../common/buttons/PrimaryButton';
import ApplicationModal from './ApplicationModal';

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

  const {isOpen, onOpen, onClose} = useDisclosure();

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
          <ApplicationModal isOpen={isOpen} onClose={onClose} />
          <Flex direction="column">
            <Flex wrap="wrap" justifyContent="space-between" gap={8}>
              <Flex direction="column">
                <Heading size="lg">My Applications</Heading>
                <Text color="#888">
                  At a Glance: {inProgressApplications.length} In-Progress,{' '}
                  {openApplications.length} Open, {closedApplications.length} Closed
                </Text>
              </Flex>
              <PrimaryButton leftIcon={<Icon as={MdPostAdd} w={6} h={6} />} onClick={onOpen}>
                Add Application
              </PrimaryButton>
            </Flex>
          </Flex>
          <ApplicationSection heading="In-Progress" applicationData={inProgressApplications} />
          <ApplicationSection heading="Open" applicationData={openApplications} />
          <ApplicationSection
            heading="Closed"
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
