import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import PageWrapper from '../common/PageWrapper';
import NavigationSidebar from '../common/navigation/NavigationSidebar';
import {MdAddBusiness, MdCheckCircle} from 'react-icons/md';
import PrimaryButton from '../common/buttons/PrimaryButton';
import {Flex, Heading, Icon, Text, useBreakpointValue, useDisclosure} from '@chakra-ui/react';
import CompaniesTable from '../companies/CompaniesTable';
import CompaniesModal from './CompaniesModal';
import LoadingSpinner from '../common/LoadingSpinner';
import {useToast} from '@chakra-ui/react';
import PrimaryToast from '../common/PrimaryToast';

const fetcher = (url, token) =>
  fetch(url, {
    headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
  }).then(res => res.json());

export default function CompaniesPage({session}) {
  const {jwt} = session;
  const {data, error} = useSWR(['/api/companies', jwt], fetcher);
  const [companies, setCompanies] = useState([]);

  const showSidebar = useBreakpointValue({
    base: false,
    lg: true,
  });
  const {isOpen, onOpen, onClose} = useDisclosure();

  const toast = useToast();

  const addCompany = company => {
    setCompanies([...companies, company]);
    toast({
      position: 'top',
      duration: 3000,
      render: () => (
        <PrimaryToast
          title="Company Added Successfully."
          description={`We've added ${company.name}.`}
          icon={MdCheckCircle}
        />
      ),
    });
  };

  // Capture the data from SWR in our useState variable
  useEffect(() => setCompanies(data), [data]);

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
          <CompaniesModal
            isOpen={isOpen}
            onClose={onClose}
            companies={companies || []}
            token={jwt}
            addCompany={addCompany}
          />
          <Flex direction="column">
            <Flex wrap="wrap" justifyContent="space-between" gap={8}>
              <Flex direction="column">
                <Heading size="lg">Job Tracker Companies</Heading>
                <Text color="#888">Showing {companies ? companies.length : '0'} companies</Text>
              </Flex>
              <PrimaryButton leftIcon={<Icon as={MdAddBusiness} w={6} h={6} />} onClick={onOpen}>
                Add Company
              </PrimaryButton>
            </Flex>
            {!data || error ? <LoadingSpinner /> : <CompaniesTable companies={companies} />}
          </Flex>
        </Flex>
      </Flex>
    </PageWrapper>
  );
}

CompaniesPage.propTypes = {};

CompaniesPage.defaultProps = {};
