import React from 'react';
import {render} from '@testing-library/react';
import GoogleLoginButton from '../../../components/landing_page/GoogleLoginButton';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';

const DEFAULT_PROPS = {};

describe('GoogleLoginButton', () => {
  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <GoogleLoginButton {...props} />
      </ChakraProvider>
    );
  };

  it('renders', () => {
    const component = setup();
    expect(component).toBeTruthy();
  });

  it('renders the "Proceed with Google" text inside a button', () => {
    const component = setup();
    const childrenText = component.getByRole('button', 'Proceed with Google');
    expect(childrenText).toBeInTheDocument();
  });

  it('renders an image with alt text for the Google logo', () => {
    const component = setup();
    const imageLogo = component.getByRole('img', {name: /Google/i});
    expect(imageLogo).toBeInTheDocument();
  });
});
