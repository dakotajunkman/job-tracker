import React from 'react';
import {render} from '@testing-library/react';
import PrimaryButton from '../../../../components/common/buttons/PrimaryButton';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';

const DEFAULT_PROPS = {
  children: 'Button Text',
  'data-testid': 'test',
};

describe('PrimaryButton', () => {
  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <PrimaryButton {...props} />
      </ChakraProvider>
    );
  };

  it('renders', () => {
    const component = setup();
    expect(component).toBeTruthy();
  });

  it('renders its children', () => {
    const component = setup();
    const button = component.getByRole('button', {name: DEFAULT_PROPS.children});
    expect(button).toBeInTheDocument();
  });

  it('renders its props', () => {
    const component = setup();
    const button = component.getByRole('button');
    expect(button).toHaveAttribute('data-testid', DEFAULT_PROPS['data-testid']);
  });
});
