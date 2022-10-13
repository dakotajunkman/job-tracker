import React from 'react';
import {render} from '@testing-library/react';
import LoginContainer from '../../../components/landing_page/LoginContainer';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {mockMatchMedia} from '../../util/util';

mockMatchMedia();
const DEFAULT_PROPS = {};

describe('LoginContainer', () => {
  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <LoginContainer {...props} />
      </ChakraProvider>
    );
  };

  it('renders', () => {
    const component = setup();
    expect(component).toBeTruthy();
  });

  describe('Existing Users Block', () => {
    it('renders text for Existing Users', () => {
      const component = setup();
      const text = component.getByText(/Existing Users/i);
      expect(text).toBeInTheDocument();
    });

    it('renders a button for Google Sign In', () => {
      const component = setup();
      const button = component.getByRole('button', {name: /Sign in with Google/i});
      expect(button).toBeInTheDocument();
    });
  });

  describe('Create an Account Block', () => {
    it('renders text for Create an Account', () => {
      const component = setup();
      const text = component.getByText(/Create an Account/i);
      expect(text).toBeInTheDocument();
    });

    it('renders a button to sign up with Google', () => {
      const component = setup();
      const button = component.getByRole('button', {name: /Sign up with Google/i});
      expect(button).toBeInTheDocument();
    });
  });
});
