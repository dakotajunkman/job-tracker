import React from 'react';
import {render} from '@testing-library/react';
import SecondaryButton from '../../../../components/common/buttons/SecondaryButton';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';

const DEFAULT_PROPS = {
  children: 'Button Text',
  'data-testid': 'test',
};

describe('SecondaryButton', () => {
  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <SecondaryButton {...props} />
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
