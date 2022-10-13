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

  it('renders a heading indicating users can sign in or sign up', () => {
    const component = setup();
    const heading = component.getByRole('heading', {name: /Create an Account or Sign in/i});
    expect(heading).toBeInTheDocument();
  });

  it('renders a button for Google Sign In', () => {
    const component = setup();
    const button = component.getByRole('button', {name: /Google/i});
    expect(button).toBeInTheDocument();
  });
});
