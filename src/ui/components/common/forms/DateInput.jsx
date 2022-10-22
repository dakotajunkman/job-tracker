import React from 'react';
import {FormControl, FormLabel, FormErrorMessage, FormHelperText, Input} from '@chakra-ui/react';
import {Field} from 'formik';

export default function DateInput({name, label, isRequired, helperText}) {
  return (
    <Field name={name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => (
        <FormControl mt={4} isRequired={isRequired} isInvalid={errors[name] && touched[name]}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Input {...field} type="date" data-testid="DateInput" />
          <FormHelperText>{helperText}</FormHelperText>
          <FormErrorMessage>{errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}

DateInput.propTypes = {};

DateInput.defaultProps = {};
