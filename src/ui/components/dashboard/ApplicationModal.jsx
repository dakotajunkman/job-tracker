import React from 'react';
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
import PropTypes, {bool, func, string} from 'prop-types';
import PrimaryButton from '../common/buttons/PrimaryButton';
import SecondaryButton from '../common/buttons/SecondaryButton';
import {MdOutlineSave} from 'react-icons/md';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {APPLICATION_STATUS_MAP} from './StatusLabel';
import TextInput from '../common/forms/TextInput';
import TextAreaInput from '../common/forms/TextAreaInput';
import DateInput from '../common/forms/DateInput';
import SelectInput from '../common/forms/SelectInput';

// These will be deleted once we can pull the data from the database
const companyOptions = [
  <option value="[UUID1]" key="Adobe">
    Adobe
  </option>,
  <option value="[UUID2]" key="Capital One">
    Capital One
  </option>,
  <option value="[UUID3]" key="Chase Bank">
    Chase Bank
  </option>,
  <option value="[UUID4]" key="Chipotle">
    Chipotle
  </option>,
];

const VALID_STATUSES = Object.keys(APPLICATION_STATUS_MAP).filter(key => key !== 'error');

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
const formatSkills = skillsString => {
  if (skillsString.length === 0) return [];
  const skills = skillsString.split(',');
  return skills.map(skill => skill.trim());
};

export default function ApplicationModel({header, isOpen, onClose}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Formik
          initialValues={{
            company_id: '[UUID1]', // Pass first company UUID here
            position_title: '',
            submit_date: getTodaysDate(),
            status: Object.keys(APPLICATION_STATUS_MAP)[0],
            skills: '',
            notes: '',
          }}
          validationSchema={Yup.object({
            company_id: Yup.string()
              .max(255, 'Must be 255 characters or less')
              .required('Company Name is required.'),
            position_title: Yup.string()
              .max(255, 'Must be 255 characters or less')
              .required('Position Title is required.'),
            submit_date: Yup.date().required('Submit Date is required.'),
            status: Yup.string().oneOf(
              VALID_STATUSES,
              'You must choose one of the specified statuses.'
            ),
            skills: Yup.string(),
            notes: Yup.string(),
          })}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify({...values, skills: formatSkills(values.skills)}, null, 2));
              actions.setSubmitting(false);
            }, 200);
          }}
        >
          {props => (
            <Form>
              <ModalHeader>{header}</ModalHeader>
              <ModalCloseButton />

              <ModalBody pb={6}>
                <SelectInput
                  name="company_id"
                  label="Company"
                  isRequired={true}
                  options={companyOptions}
                />
                <TextInput name="position_title" label="Position Title" isRequired={true} />
                <DateInput name="submit_date" label="Submit Date" isRequired={true} />
                <SelectInput
                  name="status"
                  label="Status"
                  isRequired={true}
                  options={statusOptions}
                />
                <TextAreaInput name="skills" label="Skills" resize="vertical" />
                <TextAreaInput name="notes" label="Notes" resize="vertical" />
              </ModalBody>

              <ModalFooter display="flex" gap={4}>
                <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
                <PrimaryButton leftIcon={<Icon as={MdOutlineSave} w={6} h={6} />} type="submit">
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

ApplicationModel.propTypes = {
  header: string,
  isOpen: bool.isRequired,
  onClose: func.isRequired,
};

ApplicationModel.defaultProps = {
  header: 'New Application',
};
