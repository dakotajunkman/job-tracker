import React from 'react';
import {FormControl, FormLabel, FormErrorMessage, FormHelperText, Input} from '@chakra-ui/react';
import {Field} from 'formik';

export default function TextInput({name, label, isRequired, helperText}) {
  return (
    <Field name={name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => (
        <FormControl mt={4} isRequired={isRequired} isInvalid={touched[name] && errors[name]}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Input {...field} />
          <FormHelperText>{helperText}</FormHelperText>
          <FormErrorMessage>{errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}

TextInput.propTypes = {};

TextInput.defaultProps = {};
