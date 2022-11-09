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
import useSWR from 'swr';

const VALID_STATUSES = Object.keys(APPLICATION_STATUS_MAP).filter(key => key !== 'error');

export const statusOptions = VALID_STATUSES.map(key => {
  return (
    <option value={key} key={key}>
      {APPLICATION_STATUS_MAP[key].text}
    </option>
  );
});

const fetcher = (url, token) =>
  fetch(url, {
    headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
  }).then(res => res.json());

// returns users date in format 'YYYY-MM-DD'
const getTodaysDate = () => {
  const timezoneOffsetMinutes = new Date().getTimezoneOffset();
  const userDate = new Date(new Date().getTime() - timezoneOffsetMinutes * 60 * 1000);
  return userDate.toISOString().split('T')[0];
};

// formats a string of skills into an array of strings
// IE: "skill 1, skill 2, skill 3" -> ["skill 1", "skill 2", "skill 3"]
const formatSkills = skillsString => {
  const skills = skillsString.split(',');
  return skills.filter(i => i).map(skill => skill.trim());
};

export default function ApplicationModal({header, isOpen, onClose, token, onSave}) {
  const {data: companiesData, error: companiesError} = useSWR(['/api/companies', token], fetcher);
  const [companies, setCompanies] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [companyOptions, setCompanyOptions] = useState([]);

  // Capture the data from SWR in our useState variable
  useEffect(() => {
    if (!companiesData) return;
    setCompanies(companiesData);
    setCompanyOptions(
      companiesData.map(company => (
        <option value={company.id} key={company.name}>
          {company.name}
        </option>
      ))
    );
  }, [companiesData]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Formik
          initialValues={{
            companyID: companies?.length > 0 ? companies[0].id : '',
            positionTitle: '',
            submitDate: getTodaysDate(),
            status: Object.keys(APPLICATION_STATUS_MAP)[0],
            skills: '',
            notes: '',
          }}
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
            setIsSaving(true);
            const response = await fetch('api/applications', {
              method: 'POST',
              headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
              body: JSON.stringify({...values, skills: formatSkills(values.skills)}),
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
              <ModalHeader>{header}</ModalHeader>
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

ApplicationModal.propTypes = {
  header: string,
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  token: string.isRequired,
  onSave: func.isRequired,
};

ApplicationModal.defaultProps = {
  header: 'New Application',
};
