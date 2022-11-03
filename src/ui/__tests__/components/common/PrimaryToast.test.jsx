import React from 'react';
import {render} from '@testing-library/react';
import PrimaryToast from '../../../components/common/PrimaryToast';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {MdCheckCircle} from 'react-icons/md';

const DEFAULT_PROPS = {
  title: 'Toast Title',
  description: 'Toast Description',
  icon: MdCheckCircle,
};

describe('PrimaryToast', () => {
  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <PrimaryToast {...props} />
      </ChakraProvider>
    );
  };

  it('renders', () => {
    const component = setup();
    expect(component).toBeTruthy();
  });

  it('renders the toast title as a heading', () => {
    const component = setup();
    const heading = component.getByRole('heading', {name: DEFAULT_PROPS.heading});
    expect(heading).toBeInTheDocument();
  });

  it('renders the toast description', () => {
    const component = setup();
    const description = component.getByText(DEFAULT_PROPS.description);
    expect(description).toBeInTheDocument();
  });

  it('renders the toast icon', () => {
    const component = setup();
    const icon = component.getByTestId('toast-icon');
    expect(icon).toBeInTheDocument();
  });

  it('renders the toast close button', () => {
    const component = setup();
    const button = component.getByTestId('toast-close-button');
    expect(button).toBeInTheDocument();
  });
});
