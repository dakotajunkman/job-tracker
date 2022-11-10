import React, {useEffect, useState} from 'react';
import {
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import PropTypes, {arrayOf, bool, func, shape, string} from 'prop-types';
import PrimaryButton from '../common/buttons/PrimaryButton';
import SecondaryButton from '../common/buttons/SecondaryButton';
import DangerButton from '../common/buttons/DangerButton';
import {MdDeleteOutline, MdOutlineSave} from 'react-icons/md';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import TextInput from '../common/forms/TextInput';
import TextAreaInput from '../common/forms/TextAreaInput';
import SelectInput from '../common/forms/SelectInput';
import useSWR from 'swr';
import DeleteAlert from '../common/DeleteAlert';

const COMMON_HEADERS = token => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});
const fetcher = (url, token) =>
  fetch(url, {
    headers: COMMON_HEADERS(token),
  }).then(res => res.json());

export default function ContactsModal({type, isOpen, onClose, token, onSave, onDelete, contact}) {
  const {data: companiesData, error: companiesError} = useSWR(['/api/companies', token], fetcher);
  const [companies, setCompanies] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [companyOptions, setCompanyOptions] = useState([]);
  const {isOpen: deleteIsOpen, onOpen: deleteOnOpen, onClose: deleteOnClose} = useDisclosure();

  // Capture the data from SWR in our useState variable
  useEffect(() => {
    if (!companiesData) return;
    setCompanies(companiesData);
    setCompanyOptions(
      companiesData.map(company => (
        <option value={company.id} key={company.id}>
          {company.name}
        </option>
      ))
    );
  }, [companiesData]);

  const deleteContact = async () => {
    setIsDeleting(true);
    await fetch(`/api/contacts/${contact.id}`, {
      method: 'DELETE',
      headers: COMMON_HEADERS(token),
    });
    onDelete(contact);
    setIsDeleting(false);
    onClose();
  };

  const TYPE_PROPS_MAP = {
    New: {
      header: 'New Contact',
      formInitialValues: {
        companyId: companies?.length > 0 ? companies[0].id : '',
        fullName: '',
        positionTitle: '',
        emailAddress: '',
        phoneNumber: '',
        notes: '',
      },
      request: {
        method: 'POST',
        url: 'api/contacts',
      },
    },
    Edit: {
      header: 'Edit Contact',
      formInitialValues: {
        companyId: contact?.company.id,
        fullName: contact?.fullName,
        positionTitle: contact?.positionTitle || '',
        emailAddress: contact?.emailAddress || '',
        phoneNumber: contact?.phoneNumber || '',
        notes: contact?.notes || '',
      },
      request: {
        method: 'PUT',
        url: `api/contacts/${contact?.id}`,
      },
    },
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <Formik
          initialValues={TYPE_PROPS_MAP[type].formInitialValues}
          validationSchema={Yup.object({
            companyId: Yup.string()
              .max(255, 'Must be 255 characters or less')
              .required('Company Name is required.'),
            fullName: Yup.string()
              .max(255, 'Must be 255 characters or less')
              .required('Full Name is required.'),
            positionTitle: Yup.string().max(255, 'Must be 255 characters or less'),
            emailAddress: Yup.string()
              .email('Please enter a valid email address')
              .max(255, 'Must be 255 characters or less'),
            phoneNumber: Yup.string().max(255, 'Must be 255 characters or less'),
            notes: Yup.string().max(8191, 'Must be 8191 characters or less'),
          })}
          onSubmit={async (values, actions) => {
            const {url, method} = TYPE_PROPS_MAP[type].request;
            setIsSaving(true);
            const response = await fetch(url, {
              method: method,
              headers: COMMON_HEADERS(token),
              body: JSON.stringify({
                ...values,
                userId: '8a097402-bab7-4018-89bd-de6a11161342',
                applications: [],
              }),
            });
            setIsSaving(false);

            if (response.status >= 200 && response.status < 300) {
              onSave(await response.json());
              onClose();
            }
          }}
        >
          {props => (
            <Form>
              <ModalHeader>{TYPE_PROPS_MAP[type].header}</ModalHeader>
              <ModalCloseButton />

              <ModalBody pb={6}>
                <SelectInput
                  name="companyId"
                  label="Company"
                  isRequired={true}
                  options={companyOptions}
                />
                <TextInput name="fullName" label="Contact Name" isRequired={true} />
                <TextInput name="positionTitle" label="Position Title" isRequired={false} />
                <TextInput name="emailAddress" label="Email Address" isRequired={false} />
                <TextInput name="phoneNumber" label="Phone Number" isRequired={false} />
                <TextAreaInput name="notes" label="Notes" resize="vertical" />
              </ModalBody>

              <ModalFooter display="flex" gap={2}>
                <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
                {type === 'Edit' && (
                  <DangerButton
                    leftIcon={<Icon as={MdDeleteOutline} w={6} h={6} />}
                    onClick={deleteOnOpen}
                    loadingText="Deleting"
                    isLoading={isDeleting}
                  >
                    Delete
                  </DangerButton>
                )}
                <PrimaryButton
                  leftIcon={<Icon as={MdOutlineSave} w={6} h={6} />}
                  type="submit"
                  isLoading={isSaving}
                  loadingText="Saving"
                >
                  Save
                </PrimaryButton>
                <DeleteAlert
                  isOpen={deleteIsOpen}
                  onClose={deleteOnClose}
                  onDelete={deleteContact}
                  entityName={'Contact'}
                />
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
}

ContactsModal.propTypes = {
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  token: string.isRequired,
  onSave: func.isRequired,
  onDelete: func.isRequired,
  contact: shape({
    id: string.isRequired,
    company: shape({
      id: string.isRequired,
      name: string.isRequired,
    }),
    fullName: string.isRequired,
    positionTitle: string,
    emailAddress: string,
    phoneNumber: string,
    notes: string,
  }),
};

ContactsModal.defaultProps = {};
