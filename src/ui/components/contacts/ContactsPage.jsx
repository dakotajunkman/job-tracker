import React, {useState, useEffect} from 'react';
import PropTypes, {shape, string} from 'prop-types';
import useSWR from 'swr';
import PageWrapper from '../common/PageWrapper';
import NavigationSidebar from '../common/navigation/NavigationSidebar';
import {MdPersonAddAlt1, MdCheckCircle} from 'react-icons/md';
import PrimaryButton from '../common/buttons/PrimaryButton';
import {
  Flex,
  Heading,
  Icon,
  Text,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import ContactsTable from './ContactsTable';
import ContactsModal from './ContactsModal';
import LoadingSpinner from '../common/LoadingSpinner';
import PrimaryToast from '../common/PrimaryToast';

const fetcher = (url, token) =>
  fetch(url, {
    headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
  }).then(res => res.json());

export default function ContactsPage({session}) {
  const {jwt} = session;
  const {data: contactsData, error: contactsError} = useSWR(['/api/contacts', jwt], fetcher);
  const {data: companiesData, error: companiesError} = useSWR(['/api/companies', jwt], fetcher);
  const [contacts, setContacts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [modalType, setModalType] = useState('New');
  const [currentContact, setCurrentContact] = useState(null);

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

  const addContact = contact => {
    setContacts([...contacts, contact]);
    renderToast('Contact Added Successfully.', `${contact.name} has been added to your contacts.`);
  };

  const editContact = contact => {
    const updatedContacts = contacts.map(con => {
      if (con.id === contact.id) con = contact;
      return con;
    });
    setContacts(updatedContacts);
    renderToast(
      'Contact Updated Successfully.',
      `${contact.name}'s contact information has been updated.`
    );
  };

  const deleteContact = contact => {
    const updatedContacts = contacts.filter(con => con.id !== contact.id);
    setContacts(updatedContacts);
    renderToast('Contact Deleted.', 'The contact has been deleted successfully.');
  };

  const openModalForNewContact = () => {
    setModalType('New');
    setCurrentContact(null);
    onOpen();
  };

  const openModalForEditContact = application => {
    setModalType('Edit');
    setCurrentContact(application);
    onOpen();
  };

  // Capture the data from SWR in our useState variable
  useEffect(() => setContacts(contactsData?.contacts), [contactsData]);
  useEffect(() => {
    if (!companiesData) return;
    setCompanies(companiesData.companies);
  }, [companiesData]);

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
          <ContactsModal
            type={modalType}
            isOpen={isOpen}
            onClose={onClose}
            token={jwt}
            onSave={modalType === 'New' ? addContact : editContact}
            onDelete={deleteContact}
            contact={currentContact}
            companies={companies}
          />
          <Flex direction="column">
            <Flex wrap="wrap" justifyContent="space-between" gap={8}>
              <Flex direction="column">
                <Heading size="lg">Contacts</Heading>
                <Text color="#888">Showing {contacts ? contacts.length : '0'} contacts</Text>
              </Flex>
              <PrimaryButton
                leftIcon={<Icon as={MdPersonAddAlt1} w={6} h={6} />}
                onClick={openModalForNewContact}
              >
                Add Contact
              </PrimaryButton>
            </Flex>
            {!contactsData || contactsError ? (
              <LoadingSpinner />
            ) : (
              <ContactsTable contacts={contacts} openModal={openModalForEditContact} />
            )}
          </Flex>
        </Flex>
      </Flex>
    </PageWrapper>
  );
}

ContactsPage.propTypes = {
  session: shape({
    jwt: string.isRequired,
  }).isRequired,
};

ContactsPage.defaultProps = {};
