import React, {useState} from 'react';
import {
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import PropTypes, {arrayOf, bool, func, shape, string} from 'prop-types';
import PrimaryButton from '../common/buttons/PrimaryButton';
import SecondaryButton from '../common/buttons/SecondaryButton';
import {MdOutlineSave} from 'react-icons/md';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import TextInput from '../common/forms/TextInput';

export default function CompaniesModal({header, isOpen, onClose, companies, token, addCompany}) {
  const [isSaving, setIsSaving] = useState(false);
  const existingCompanies = companies.map(company => company.name);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Formik
          initialValues={{name: ''}}
          validationSchema={Yup.object({
            name: Yup.string()
              .max(255, 'Must be 255 characters or less')
              .required('Company name is required.')
              .notOneOf(existingCompanies, 'Error: company name already exists.'),
          })}
          onSubmit={async (values, actions) => {
            setIsSaving(true);
            const response = await fetch('api/companies', {
              method: 'POST',
              headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
              body: JSON.stringify(values),
            });
            setIsSaving(false);
            console.log(response.status >= 200 && response.status < 300);
            if (response.status >= 200 && response.status < 300) {
              addCompany(await response.json());
              onClose();
            }
          }}
        >
          {props => (
            <Form>
              <ModalHeader>{header}</ModalHeader>
              <ModalCloseButton />

              <ModalBody pb={6}>
                <TextInput name="name" label="Company Name" isRequired={true} />
              </ModalBody>

              <ModalFooter display="flex" gap={4}>
                <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
                <PrimaryButton
                  leftIcon={<Icon as={MdOutlineSave} w={6} h={6} />}
                  type="submit"
                  isLoading={isSaving}
                  loadingText="Saving"
                >
                  Save
                </PrimaryButton>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
}

CompaniesModal.propTypes = {
  header: string,
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  companies: arrayOf(
    shape({
      id: string,
      name: string,
    })
  ),
};

CompaniesModal.defaultProps = {
  header: 'New Company',
  companies: [],
};
