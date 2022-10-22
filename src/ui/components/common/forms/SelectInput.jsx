import React from 'react';
import {FormControl, FormLabel, FormErrorMessage, FormHelperText, Select} from '@chakra-ui/react';
import {Field} from 'formik';

export default function SelectInput({name, label, isRequired, options, helperText}) {
  return (
    <Field name={name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => (
        <FormControl mt={4} isRequired={isRequired} isInvalid={errors[name]}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Select {...field}>{options}</Select>
          <FormHelperText>{helperText}</FormHelperText>
          <FormErrorMessage>{errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}

SelectInput.propTypes = {};

SelectInput.defaultProps = {};
