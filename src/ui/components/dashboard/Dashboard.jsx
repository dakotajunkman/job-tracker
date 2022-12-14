import React, {useEffect, useState} from 'react';
import {useSession} from 'next-auth/react';
import {
  Flex,
  Heading,
  Icon,
  Text,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import PageWrapper from '../common/PageWrapper';
import NavigationSidebar from '../common/navigation/NavigationSidebar';
import ApplicationSection from './ApplicationSection';
import {MdCheckCircle, MdPostAdd} from 'react-icons/md';
import PrimaryButton from '../common/buttons/PrimaryButton';
import ApplicationModal from './ApplicationModal';
import PrimaryToast from '../common/PrimaryToast';
import LoadingSpinner from '../common/LoadingSpinner';
import useSWR from 'swr';

const IN_PROGRESS_STATUSES = new Set([
  'ASSIGNED_OA',
  'COMPLETED_OA',
  'PHONE_SCREEN_SCHEDULED',
  'PHONE_SCREEN_COMPLETE',
  'INTERVIEW_SCHEDULED',
  'INTERVIEW_COMPLETE',
  'RECEIVED_OFFER',
]);
const CLOSED_STATUSES = new Set([
  'ACCEPTED_OFFER',
  'REJECTED_OFFER',
  'REJECTED_BY_COMPANY',
  'POSITION_CANCELLED',
]);

const fetcher = (url, token) =>
  fetch(url, {
    headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
  }).then(res => res.json());

export default function Dashboard() {
  const {data: session} = useSession();
  const {jwt} = session;
  const {data: applicationData, error: applicationError} = useSWR(
    ['/api/applications', jwt],
    fetcher
  );
  const {data: companiesData, error: companiesError} = useSWR(['/api/companies', jwt], fetcher);
  const {data: contactsData, error: contactsError} = useSWR(['/api/contacts', jwt], fetcher);

  const [applications, setApplications] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [openApplications, setOpenApplications] = useState([]);
  const [inProgressApplications, setInProgressApplications] = useState([]);
  const [closedApplications, setClosedApplications] = useState([]);
  const [modalType, setModalType] = useState('New');
  const [currentApplication, setCurrentApplication] = useState(null);

  const showSidebar = useBreakpointValue({
    base: false,
    lg: true,
  });

  const {isOpen, onOpen, onClose} = useDisclosure();

  const toast = useToast();
  const renderToast = (title, description) =>
    toast({
      position: 'top',
      duration: 3000,
      render: () => <PrimaryToast title={title} description={description} icon={MdCheckCircle} />,
    });

  const addApplication = application => {
    setApplications([...applications, application]);
    renderToast(
      'Application Added Successfully.',
      'The application has been added to your dashboard.'
    );
  };

  const editApplication = application => {
    const updatedApplications = applications.map(app => {
      if (app.id === application.id) app = application;
      return app;
    });
    setApplications(updatedApplications);
    renderToast(
      'Application Updated Successfully.',
      'The application has been updated on your dashboard.'
    );
  };

  const deleteApplication = application => {
    const updatedApplications = applications.filter(app => app.id !== application.id);
    setApplications(updatedApplications);
    renderToast('Application Deleted.', 'The application has been deleted from your dashboard.');
  };

  const openModalForNewApplication = () => {
    setModalType('New');
    setCurrentApplication(null);
    onOpen();
  };

  const openModalForEditApplication = application => {
    setModalType('Edit');
    setCurrentApplication(application);
    onOpen();
  };

  // Capture the data from SWR in our useState variable
  useEffect(() => {
    if (!applicationData) return;
    setApplications(applicationData.applications);
  }, [applicationData]);
  useEffect(() => {
    if (!applications) return;
    setOpenApplications(applications.filter(application => application.status === 'APPLIED'));
    setInProgressApplications(
      applications.filter(application => IN_PROGRESS_STATUSES.has(application.status))
    );
    setClosedApplications(
      applications.filter(application => CLOSED_STATUSES.has(application.status))
    );
  }, [applications]);
  useEffect(() => {
    if (!companiesData) return;
    setCompanies(companiesData.companies);
  }, [companiesData]);
  useEffect(() => {
    if (!contactsData) return;
    setContacts(contactsData.contacts);
  }, [contactsData]);

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
          <ApplicationModal
            type={modalType}
            isOpen={isOpen}
            onClose={onClose}
            token={jwt}
            onSave={modalType === 'New' ? addApplication : editApplication}
            onDelete={deleteApplication}
            application={currentApplication}
            companies={companies}
            contacts={contacts}
          />
          <Flex direction="column">
            <Flex wrap="wrap" justifyContent="space-between" gap={8}>
              <Flex direction="column">
                <Heading size="lg">My Applications</Heading>
                <Text color="#888">
                  At a Glance: {inProgressApplications ? inProgressApplications.length : '0'}{' '}
                  In-Progress, {openApplications ? openApplications.length : '0'} Open,{' '}
                  {closedApplications ? closedApplications.length : '0'} Closed
                </Text>
              </Flex>
              <PrimaryButton
                leftIcon={<Icon as={MdPostAdd} w={6} h={6} />}
                onClick={openModalForNewApplication}
              >
                Add Application
              </PrimaryButton>
            </Flex>
          </Flex>
          {!applicationData || applicationError ? (
            <LoadingSpinner />
          ) : (
            <>
              <ApplicationSection
                heading="In-Progress"
                applicationData={inProgressApplications}
                openModal={openModalForEditApplication}
              />
              <ApplicationSection
                heading="Open"
                applicationData={openApplications}
                openModal={openModalForEditApplication}
              />
              <ApplicationSection
                heading="Closed"
                applicationData={closedApplications}
                startOpened={false}
                openModal={openModalForEditApplication}
              />
            </>
          )}
        </Flex>
      </Flex>
    </PageWrapper>
  );
}

Dashboard.propTypes = {};

Dashboard.defaultProps = {};
