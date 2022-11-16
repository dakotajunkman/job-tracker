import React, {useState, useEffect} from 'react';
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
  Link,
} from '@chakra-ui/react';
import PropTypes, {arrayOf, bool, func, object, shape, string} from 'prop-types';
import PrimaryButton from '../common/buttons/PrimaryButton';
import SecondaryButton from '../common/buttons/SecondaryButton';
import DangerButton from '../common/buttons/DangerButton';
import {MdDeleteOutline, MdOutlineSave} from 'react-icons/md';
import {Form, Formik, FieldArray} from 'formik';
import * as Yup from 'yup';
import {APPLICATION_STATUS_MAP} from './StatusLabel';
import TextInput from '../common/forms/TextInput';
import TextAreaInput from '../common/forms/TextAreaInput';
import DateInput from '../common/forms/DateInput';
import SelectInput from '../common/forms/SelectInput';
import DeleteAlert from '../common/DeleteAlert';

const VALID_STATUSES = Object.keys(APPLICATION_STATUS_MAP).filter(key => key !== 'error');
const COMMON_HEADERS = token => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});

export const statusOptions = VALID_STATUSES.map(key => {
  return (
    <option value={key} key={key}>
      {APPLICATION_STATUS_MAP[key].text}
    </option>
  );
});

// returns users date in format 'YYYY-MM-DD'
const getTodaysDate = () => {
  const timezoneOffsetMinutes = new Date().getTimezoneOffset();
  const userDate = new Date(new Date().getTime() - timezoneOffsetMinutes * 60 * 1000);
  return userDate.toISOString().split('T')[0];
};

// formats a string of skills into an array of strings
// IE: "skill 1, skill 2, skill 3" -> ["skill 1", "skill 2", "skill 3"]
const skillsToList = skillsString => {
  const skills = skillsString.split(',');
  return skills.filter(i => i).map(skill => skill.trim());
};

const skillsToString = skillsList => {
  if (!skillsList || skillsList.length === 0) return '';
  return skillsList.reduce((prev, curr) => `${prev}, ${curr}`);
};

const removeBlankContacts = contacts => contacts.filter(contact => contact);

export default function ApplicationModal({
  type,
  isOpen,
  onClose,
  token,
  onSave,
  onDelete,
  application,
  companies,
  contacts,
}) {
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [contactDropdowns, setContactDropdowns] = useState([]);
  const {isOpen: deleteIsOpen, onOpen: deleteOnOpen, onClose: deleteOnClose} = useDisclosure();

  const companyOptions = companies.map(company => (
    <option value={company.id} key={company.id}>
      {company.name}
    </option>
  ));
  const blankContact = {id: '', fullName: ''};
  const contactOptions = [blankContact, ...contacts].map(contact => (
    <option value={contact.id} key={contact.id}>
      {contact.fullName}
    </option>
  ));

  const deleteApplication = async () => {
    setIsDeleting(true);
    await fetch(`/api/applications/${application.id}`, {
      method: 'DELETE',
      headers: COMMON_HEADERS(token),
    });
    onDelete(application);
    setIsDeleting(false);
    onClose();
  };

  const createContactDropdown = key => (
    <SelectInput
      name={'contacts' + key}
      label={`Contact ${key + 1}`}
      key={key}
      isRequired={false}
      options={contactOptions}
    />
  );

  const addContactDropdown = () => {
    const key = contactDropdowns.length;
    const newdropDowns = [...contactDropdowns, createContactDropdown(key)];
    setContactDropdowns(newdropDowns);
  };

  useEffect(() => {
    const loadedContacts = [];
    application &&
      application.contacts.forEach((contact, index) => {
        loadedContacts.push(createContactDropdown(index));
      });
    setContactDropdowns(loadedContacts);
  }, [isOpen]);

  const TYPE_PROPS_MAP = {
    New: {
      header: 'New Application',
      formInitialValues: {
        companyID: companies?.length > 0 ? companies[0].id : '',
        positionTitle: '',
        submitDate: getTodaysDate(),
        status: Object.keys(APPLICATION_STATUS_MAP)[0],
        skills: '',
        notes: '',
        contacts: '',
      },
      request: {
        method: 'POST',
        url: 'api/applications',
      },
    },
    Edit: {
      header: 'Edit Application',
      formInitialValues: {
        companyID: application?.company.id,
        positionTitle: application?.positionTitle,
        submitDate: application?.submitDate,
        status: application?.status,
        skills: skillsToString(application?.skills),
        notes: application?.notes,
        contacts: application?.contacts.length > 0 ? application?.contacts[0].id : '',
      },
      request: {
        method: 'PUT',
        url: `api/applications/${application?.id}`,
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
            companyID: Yup.string()
              .max(255, 'Must be 255 characters or less')
              .required('Company Name is required.'),
            positionTitle: Yup.string()
              .max(255, 'Must be 255 characters or less')
              .required('Position Title is required.'),
            submitDate: Yup.date().required('Submit Date is required.'),
            status: Yup.string().oneOf(
              VALID_STATUSES,
              'You must choose one of the specified statuses.'
            ),
            skills: Yup.string(),
            notes: Yup.string(),
          })}
          onSubmit={async (values, actions) => {
            const {url, method} = TYPE_PROPS_MAP[type].request;
            setIsSaving(true);
            const response = await fetch(url, {
              method: method,
              headers: COMMON_HEADERS(token),
              body: JSON.stringify({
                ...values,
                skills: skillsToList(values.skills),
                contacts: removeBlankContacts([values.contacts]),
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
                  name="companyID"
                  label="Company"
                  isRequired={true}
                  options={companyOptions}
                />
                <TextInput name="positionTitle" label="Position Title" isRequired={true} />
                <DateInput name="submitDate" label="Submit Date" isRequired={true} />
                <SelectInput
                  name="status"
                  label="Status"
                  isRequired={true}
                  options={statusOptions}
                />
                <TextAreaInput name="skills" label="Skills" resize="vertical" />
                <TextAreaInput name="notes" label="Notes" resize="vertical" />
                <FieldArray
                  name="contacts"
                  render={arrayHelpers => (
                    <>
                      {application.contacts.map((contact, index) => (
                        <SelectInput
                          name={`contacts.${index}`}
                          label={`Contact ${index + 1}`}
                          key={index}
                          isRequired={false}
                          options={contactOptions}
                        />
                      ))}
                      <Link onClick={() => arrayHelpers.push('')}>
                        Add another contact to this application.
                      </Link>
                    </>
                  )}
                />
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
                  onDelete={deleteApplication}
                  entityName={'Application'}
                />
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
}

ApplicationModal.propTypes = {
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  token: string.isRequired,
  onSave: func.isRequired,
  onDelete: func.isRequired,
  application: shape({
    id: string.isRequired,
    positionTitle: string.isRequired,
    submitDate: string.isRequired,
    status: string.isRequired,
    skills: arrayOf(string),
    notes: string,
    company: shape({
      id: string.isRequired,
      name: string.isRequired,
    }),
    contacts: arrayOf(
      shape({
        id: string.isRequired,
        company: shape({
          id: string.isRequired,
          name: string.isRequired,
        }),
        fullName: string.isRequired,
      })
    ).isRequired,
  }),
  companies: arrayOf(
    shape({
      id: string.isRequired,
      name: string.isRequired,
    })
  ).isRequired,
  contacts: arrayOf(
    shape({
      id: string.isRequired,
      fullName: string.isRequired,
    })
  ).isRequired,
};

ApplicationModal.defaultProps = {
  application: null,
  companies: [],
};
