import React from 'react';
import {render} from '@testing-library/react';
import DateInput from '../../../../components/common/forms/DateInput';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {Formik, Form} from 'formik';

const DEFAULT_PROPS = {
  name: 'text_field',
  label: 'Text Field',
  isRequired: true,
  helperText: 'Enter text into this field',
};

describe('TextInput', () => {
  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <Formik>
          {formikProps => (
            <Form>
              <DateInput {...props} />
            </Form>
          )}
        </Formik>
      </ChakraProvider>
    );
  };

  it('renders', () => {
    const component = setup();
    expect(component).toBeTruthy();
  });

  it('renders the input field label', () => {
    const component = setup();
    const label = component.getByText(DEFAULT_PROPS.label);
    expect(label).toBeInTheDocument();
  });

  it('renders the input field with the correct name', () => {
    const component = setup();
    const input = component.getByTestId('DateInput');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('name', DEFAULT_PROPS.name);
  });

  it('renders the helper text', () => {
    const component = setup();
    const helperText = component.getByText(DEFAULT_PROPS.helperText);
    expect(helperText).toBeInTheDocument();
  });
});
